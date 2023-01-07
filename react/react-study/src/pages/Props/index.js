import React, { useRef } from 'react';
import { Card, Button } from 'antd';

class Form extends React.Component {
	state = {
		formData: {}
	};

	/* 提交数据 */
	submitForm = (cb) => {
		cb(this.state.formData);
	};

	/* 重置表单 */
	resetForm = () => {
		const result = {};
		Object.keys(this.state.formData).forEach((key) => {
			result[key] = '';
		});
		this.setState({
			formData: result
		});
	};

	setValue = (name, value) => {
		this.setState({
			formData: {
				...this.state.formData,
				[name]: value
			}
		});
	};

	render() {
		const { children } = this.props;
		const renderChildren = [];
		// 扁平化children，循环
		React.Children.forEach(children, (child) => {
			if (child.type.displayName === 'formItem') {
				// 拿出formItem的name作为key
				const { name } = child.props;
				const children = React.cloneElement(
					child,
					{
						key: name,
						handleChange: this.setValue,
						value: this.state.formData[name] || ''
					},
					child.props.children
				);
				renderChildren.push(children);
			}
		});

		return renderChildren;
	}
}

const FormItem = (props) => {
	const { children, name, handleChange, value, label } = props;
	const onChange = (value) => {
		handleChange(name, value);
	};

	return (
		<div className="form">
			<span className="label">{label}:</span>
			{React.isValidElement(children) && children.type.displayName === 'input'
				? React.cloneElement(children, { onChange, value })
				: null}
		</div>
	);
};

FormItem.displayName = 'formItem';

const Input = ({ onChange, value }) => {
	return (
		<input
			className="input"
			onChange={(e) => onChange && onChange(e.target.value)}
			value={value}
		></input>
	);
};

Input.displayName = 'input';

/* 增加组件类型type */
Form.displayName = 'form';

const Index = () => {
	const form = useRef(null);

	const submit = () => {
		form.current.submitForm((formValue) => {
			console.log(formValue);
		});
	};

	const reset = () => {
		form.current.resetForm();
	};

	return (
		<>
			<Card type="inner" title="函数组件" style={{ marginTop: 10 }}>
				<div className="box">
					<Form ref={form}>
						<FormItem name="name" label="我是">
							<Input></Input>
						</FormItem>
						<FormItem name="mes" label="我想对大家说">
							<Input></Input>
						</FormItem>
						<input placeholder="不需要的input" />
						<Input />
					</Form>
				</div>
				<div>
					<Button type="primary" onClick={submit}>
						提交
					</Button>
					<Button type="warning" onClick={reset}>
						重置
					</Button>
				</div>
			</Card>
		</>
	);
};

export default Index;
