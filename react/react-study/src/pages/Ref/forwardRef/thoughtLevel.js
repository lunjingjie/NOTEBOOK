import React from 'react';

function Son(props) {
	return (
		<div>
			<span ref={props.grandRef}>需要获取的子元素</span>
		</div>
	);
}

class Father extends React.Component {
	render() {
		return (
			<div>
				<Son grandRef={this.props.grandRef}></Son>
			</div>
		);
	}
}

const NewFather = React.forwardRef((props, ref) => {
	return (
		<div>
			<Father grandRef={ref} {...props}></Father>
		</div>
	);
});

export default class GrandFather extends React.Component {
	node = null;
	componentDidMount() {
		console.log(this.node);
	}

	render() {
    return <div>
      <NewFather ref={(node) => this.node = node}></NewFather>
    </div>
  }
}
