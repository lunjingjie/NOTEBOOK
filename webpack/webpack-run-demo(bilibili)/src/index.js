import Add from './add';
import Multiply from './multiply';
import { once } from 'loadsh';

const addResult = once(Add(1, 2));
const mulResult = Multiply(1, 2);

console.log(addResult);
console.log(mulResult);