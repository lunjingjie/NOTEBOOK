import { Button, Input } from 'antd';
import React, { useRef, useState } from 'react';

class Son extends React.PureComponent {
	state = {
		fatherMes: '',
		sonMes: ''
	};

	fatherSay = (word) => {
		this.setState({
			fatherMes: word
		});
	};

	render() {
		const { fatherMes, sonMes } = this.state;
		const { toFather } = this.props;
		return (
			<div>
				<span>父组件对我说：{fatherMes}</span>
				<div>
					<span>我对父组件说：</span>
					<Input style={{width: 200}} onChange={(e) => this.setState({ sonMes: e.target.value })}></Input>
					<Button type="primary" onClick={() => toFather(sonMes)}>
						to father
					</Button>
				</div>
			</div>
		);
	}
}

export default function Father() { 
	const [sonMes, setSonMes] = useState('');
	const [fatherMes, setFatherMes] = useState('');
	const sonInstance = useRef(null);
	const toSon = () => {
		sonInstance.current.fatherSay(fatherMes);
	};
	return (
		<div>
			<div>
				<span>子组件对我说：{sonMes}</span>
			</div>
			<div>
				<span>对子组件说：</span>
				<Input style={{width: 200}} onChange={(e) => setFatherMes(e.target.value)}></Input>
				<Button type="primary" onClick={toSon}>
					to son
				</Button>
				<Son ref={sonInstance} toFather={setSonMes}></Son>
			</div>
		</div>
	);
}
