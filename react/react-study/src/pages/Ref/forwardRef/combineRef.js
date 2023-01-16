import { Button } from 'antd';
import React from 'react';

class Form extends React.Component {
	render() {
		return <div>this is form component</div>;
	}
}

class Index extends React.Component {
	form = null;
	button = null;

	componentDidMount() {
		this.props.forwardRef.current = {
			form: this.form,
			button: this.button,
			instance: this
		};
	}

	render() {
		return (
			<div>
				<Form ref={(form) => (this.form = form)}></Form>
				<Button ref={(button) => (this.button = button)}>button</Button>
			</div>
		);
	}
}

const ForwardIndex = React.forwardRef((props, ref) => {
	return <Index forwardRef={ref} {...props}></Index>;
});

export default function Home() {
	const ref = React.useRef(null);
  React.useEffect(() => {
    console.log(ref.current);
  }, []);
	return <ForwardIndex ref={ref}></ForwardIndex>;
}
