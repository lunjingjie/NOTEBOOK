import { useState } from "react";
import { Input } from 'antd';

const Parent = () => {

  const [parentSay] = useState('parent say to child');
  const [childSay, setChildSay] = useState('');

	return (
		<>
			<div>
				<Child parentSay={parentSay} childSay={setChildSay}></Child>
				<div>子传父：{childSay}</div>
			</div>
		</>
	);
};

const Child = (props) => {
  const { parentSay, childSay } = props;
  return (
    <>
    <div>父传子props：{parentSay}</div>
				<div style={{ marginTop: 10 }}>
					<Input placeholder="子传父" onChange={(e) => childSay(e.target.value)} />
				</div>
    </>
  );
};

export default Parent;