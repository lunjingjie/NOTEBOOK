import { Button } from 'antd';
import ReactDom from 'react-dom';
import React from 'react';

export default class ClassComp extends React.Component {
	state = {
		number: 0
	};

	// 测试批量更新
	test = () => {
		setTimeout(() => {
			this.setState({ number: 1 });
      console.log(this.state.number);
		});
		this.setState({ number: 2 });
		ReactDom.flushSync(() => {
			this.setState({ number: 3 });
      console.log(this.state.number);
		});
		this.setState({ number: 4 });
    console.log(this.state.number);
	};

  componentDidUpdate(p, ps) {
    console.log(this.state);
    console.log(ps);
  }

	render() {
		return (
			<>
				<div>{this.state.number}</div>
				<Button type="primary" onClick={this.test}>
					test
				</Button>
			</>
		);
	}
}
