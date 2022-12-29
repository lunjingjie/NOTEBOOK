import React from 'react';
import { Input } from 'antd';

export default class Parent extends React.Component {
	state = {
		name: 'parent say to child',
		childSay: ''
	};

  componentDidMount() {
		console.log('mount');
	}

	handleChildChange = (e) => {
		this.setState({
			childSay: e.target.value
		});
	};

	render() {
		return (
			<div>
				<Child parentSay={this.state.name} childSay={this.handleChildChange}></Child>
				<div>子传父：{this.state.childSay}</div>
			</div>
		);
	}
}

class Child extends React.Component {
	render() {
		const { parentSay, childSay } = this.props;
		return (
			<>
				<div>父传子props：{parentSay}</div>
				<div style={{ marginTop: 10 }}>
					<Input placeholder="子传父" onChange={childSay} />
				</div>
			</>
		);
	}
}
