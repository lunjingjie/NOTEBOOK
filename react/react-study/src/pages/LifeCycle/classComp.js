import React, { useEffect, useState, useCallback } from 'react';

function Item({ item }) {
	return (
		<div className="goods_item">
			<img src={item.giftImage} className="item_image" alt="" />
			<div className="item_content">
				<div className="goods_name">{item.giftName}</div>
				<div className="hold_price" />
				<div className="new_price">
					<div className="new_price">
						<div className="one view">¥ {item.price}</div>
					</div>
				</div>
				<img className="go_share  go_text" alt="" />
			</div>
		</div>
	);
}

export default React.memo(() => {
	const [data, setData] = useState({ list: [], page: 0, pageCount: 1 });
	const getData = useCallback(() => {
		if (data.page === data.pageCount) {
			console.log('没有数据了');
		}
		const res = {
			code: 0,
			page: 1,
			list: []
		};
		if (res.code === 0) {
			setData({
				...res,
				list: res.page === 1 ? res.list : data.list.concat(res.list)
			});
		}
	}, [data]);

	const handleScrollToLower = () => {
		console.log('scroll已经到底部');
		getData();
	};

	useEffect(() => {
		console.log('getData effect');
		getData();
	}, [getData]);

	return (
		<ScrollView
			data={data} /*  */
			component={Item} /* Item 渲染的单元组件 */
			scrolltolower={handleScrollToLower}
			scroll={() => {}}
		/>
	);
});

class ScrollView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
	}

	node = null;

	/* 控制滚动条滚动 */
	handleScroll = (e) => {
		const { scroll } = this.props;
		scroll && scroll(e);
		this.handleScrollToLower();
	};

	/* 判断滚动条是否到底部 */
	handleScrollToLower() {
		const { handleScrollToLower } = this.props;
		const { scrollHeight, scrollTop, offsetHeight } = this.node;
		if (scrollHeight === scrollTop + offsetHeight) {
			handleScrollToLower && handleScrollToLower();
		}
	}

	/* 静态方法，接收props，合并到state */
	static getDerivedStateFromProps(newProps) {
		const { data } = newProps;
		return {
			list: data.list || []
		};
	}

	/* 组件是否需要更新，性能优化，数据变化才渲染列表 */
	shouldComponentUpdate(newProps, newState) {
		return newState.list !== this.state.list;
	}

	/* 组件更新前设置快照 */
	getSnapshotBeforeUpdate() {
		return this.node.scrollHeight;
	}

	/* 组件更新后 */
	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log('容器高度变化：', this.node.scrollHeight - snapshot.scrollHeight);
	}

	componentDidMount() {
		this.node.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		this.node.removeEventListener('scroll', this.handleScroll);
	}

	render() {
		const { list } = this.state;
		const { component } = this.props;
		return (
			<div className="list_box" ref={(node) => (this.node = node)}>
				<div>
					{list.map(
						(item) => React.createElement(component, { item, key: item.id }) //渲染 Item 列表内容。
					)}
				</div>
			</div>
		);
	}
}
