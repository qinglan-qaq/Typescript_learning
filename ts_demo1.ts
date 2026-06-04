/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║                 TypeScript 入门教程 —— 从零开始掌握 TS                            ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * 运行方式：
 *     npm run dev                    → 用 ts-node 直接运行本文件
 *     npm run build                → 编译成 JS 到 dist/
 *     npm start                        → 编译后运行
 *
 * TypeScript = JavaScript + 类型系统
 * 类型系统是 TS 的核心：它在代码运行之前就能发现错误。
 */


// 第一章：基础类型 (Basic Types)


console.log('========== 第一章：基础类型 ==========\n');

// 1.1 字符串、数字、布尔值 —— 三种最常用的类型
let username: string = '小明';
let age: number = 25;
let isStudent: boolean = true;

console.log(`我叫 ${username}，今年 ${age} 岁，${isStudent ? '是' : '不是'}学生`);

// 1.2 数组 —— 两种写法等价
let scores: number[] = [85, 92, 78, 90]; // 推荐写法
let names: Array<string> = ['Alice', 'Bob']; // 泛型写法

let score_hw: string[] = ['语文', '数学', '英语'];
let item_name: Array<string> = ['语文', '数学', '英语'];


console.log(`成绩: ${scores.join(', ')}`);
console.log(`名字: ${names.join(', ')}`);

// 1.3 元组 (Tuple) —— 固定长度、不同类型的数组
let person: [string, number] = ['小红', 30];
console.log(`元组: 姓名=${person[0]}, 年龄=${person[1]}`);

// 1.4 枚举 (Enum) —— 给一组数值起名字
enum Direction {
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT',
}
let move: Direction = Direction.Up;
console.log(`移动方向: ${move}`);

// 1.5 any —— 任意类型（尽量少用，否则失去 TS 的意义）
let anything: any = '可以是字符串';
anything = 123; // 不会报错，但也不安全
console.log(`any 类型: ${anything}`);

// 1.6 void —— 表示没有返回值（常用于函数）
function sayHello(): void {
    console.log('Hello, TypeScript!');
}
sayHello();


// 第二章：类型推断 (Type Inference)


console.log('\n========== 第二章：类型推断 ==========\n');

// TS 很聪明：你不写类型，它也能自动推断
let autoString = '自动推断为 string'; // 类型自动为 string
// autoString = 123;    // ❌ 编译错误：不能把 number 赋给 string

let autoNumber = 42; // 类型自动为 number
let autoArray = [1, 2, 3]; // 类型自动为 number[]

console.log(`推断 string: ${autoString}`);
console.log(`推断 number: ${autoNumber}`);
console.log(`推断 array: [${autoArray.join(', ')}]`);


// 第三章：接口 (Interface) —— 定义对象的形状


console.log('\n========== 第三章：接口 (Interface) ==========\n');

// 接口定义了对象必须有哪些属性、是什么类型
interface User {
    name: string;
    age: number;
    email?: string; // ? 表示可选属性
    readonly id: number; // readonly 表示只读，初始化后不能改
}

let user1: User = {
    name: '张三',
    age: 28,
    id: 1001,
    // email 可以不写，因为它是可选的
};
// user1.id = 2002;    // ❌ 编译错误：id 是只读的

console.log(`用户: ${user1.name}, ID: ${user1.id}`);

// 接口可以描述函数类型
interface MathFunc {
    (a: number, b: number): number;
}

const add: MathFunc = (x, y) => x + y;
const multiply: MathFunc = (x, y) => x * y;

console.log(`3 + 5 = ${add(3, 5)}`);
console.log(`3 × 5 = ${multiply(3, 5)}`);


// 第四章：类型别名 (Type Alias)


console.log('\n========== 第四章：类型别名 ==========\n');

// type 可以给任何类型起一个新名字
type ID = string | number; // 联合类型：可以是 string 或 number
type Point = { x: number; y: number };

function printID(id: ID): void {
    console.log(`ID: ${id} (类型: ${typeof id})`);
}

printID(12345);
printID('abc-67890');

let point: Point = { x: 10, y: 20 };
console.log(`坐标: (${point.x}, ${point.y})`);


// 第五章：联合类型与类型守卫


console.log('\n========== 第五章：联合类型 & 类型守卫 ==========\n');

// 联合类型：一个值可以是多种类型之一
type Result = 'success' | 'error' | 'pending';

function handleResult(status: Result): void {
    switch (status) {
        case 'success':
            console.log('✅ 操作成功');
            break;
        case 'error':
            console.log('❌ 操作失败');
            break;
        case 'pending':
            console.log('⏳ 处理中...');
            break;
    }
}

handleResult('success');
handleResult('pending');

// typeof 类型守卫
function printValue(value: string | number): void {
    if (typeof value === 'string') {
        console.log(`字符串: ${value.toUpperCase()}`); // 这里 value 是 string
    } else {
        console.log(`数字: ${value.toFixed(2)}`); // 这里 value 是 number
    }
}

printValue('hello');
printValue(3.14159);


// 第六章：函数 (Functions)


console.log('\n========== 第六章：函数 ==========\n');

// 完整的函数类型注解
function greet(name: string, count: number = 1): string {
    return `你好 ${name}！你说了 ${count} 次。`;
}

console.log(greet('小明'));
console.log(greet('小红', 3));

// 剩余参数
function sumAll(...nums: number[]): number {
    return nums.reduce((total, n) => total + n, 0);
}

console.log(`总和: ${sumAll(1, 2, 3, 4, 5)}`);

// 箭头函数 + 类型
const double = (n: number): number => n * 2;
console.log(`double(8) = ${double(8)}`);

// 回调函数类型
function doOperation(a: number, b: number, operation: (x: number, y: number) => number): number {
    return operation(a, b);
}

console.log(`10 + 20 = ${doOperation(10, 20, add)}`);
console.log(`10 × 20 = ${doOperation(10, 20, multiply)}`);


// 第七章：类 (Classes)


console.log('\n========== 第七章：类 ==========\n');

class Animal {
    // 访问修饰符: public(默认) / private / protected
    protected name: string; // protected: 子类可以访问

    constructor(name: string) {
        this.name = name;
    }

    public makeSound(): void {
        console.log(`${this.name} 发出了声音`);
    }
}

// extends 继承
class Dog extends Animal {
    private breed: string; // private: 只有本类可以访问

    constructor(name: string, breed: string) {
        super(name); // 必须调用父类构造函数
        this.breed = breed;
    }

    // 重写父类方法
    public makeSound(): void {
        console.log(`${this.name} (${this.breed}): 汪汪! 🐶`);
    }

    public fetch(): void {
        console.log(`${this.name} 在捡球!`);
    }
}

class Cat extends Animal {
    constructor(name: string) {
        super(name);
    }

    public makeSound(): void {
        console.log(`${this.name}: 喵喵! 🐱`);
    }
}

const dog = new Dog('旺财', '金毛');
const cat = new Cat('咪咪');

dog.makeSound();
dog.fetch();
cat.makeSound();


// 第八章：泛型 (Generics)


console.log('\n========== 第八章：泛型 ==========\n');

// 泛型：让函数、接口、类支持多种类型，同时保持类型安全
// <T> 是类型变量，调用时确定具体类型

// 泛型函数 —— 返回传入的数组的第一个元素
function firstElement<T>(arr: T[]): T | undefined {
    return arr[0];
}

console.log(`第一个数字: ${firstElement([10, 20, 30])}`);
console.log(`第一个字符串: ${firstElement(['a', 'b', 'c'])}`);

// 泛型接口
interface Box<T> {
    value: T;
}

let stringBox: Box<string> = { value: 'Hello' };
let numberBox: Box<number> = { value: 42 };

console.log(`字符串盒子: ${stringBox.value}`);
console.log(`数字盒子: ${numberBox.value}`);

// 泛型约束 —— 用 extends 限制 T 必须有哪些属性
function getLength<T extends { length: number }>(item: T): number {
    return item.length;
}

console.log(`字符串长度: ${getLength('Hello World')}`);
console.log(`数组长度: ${getLength([1, 2, 3, 4, 5])}`);
// getLength(123);    // ❌ 编译错误：number 没有 length 属性

// 多个泛型参数
function pair<K, V>(key: K, value: V): [K, V] {
    return [key, value];
}

const [k, v] = pair('age', 30);
console.log(`键值对: ${k} = ${v}`);


// 第九章：实用工具类型 (Utility Types)


console.log('\n========== 第九章：工具类型 ==========\n');

interface Todo {
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}

// Partial<T> —— 所有属性变为可选
function updateTodo(id: number, fields: Partial<Todo>): void {
    console.log(`更新待办 #${id}:`, fields);
}
updateTodo(1, { completed: true }); // 只需要传要更新的字段

// Readonly<T> —— 所有属性变为只读
const frozenTodo: Readonly<Todo> = {
    title: '学习 TypeScript',
    description: '掌握基础类型与泛型',
    completed: false,
    createdAt: new Date(),
};
// frozenTodo.title = "xxx";    // ❌ 编译错误

// Pick<T, K> —— 从 T 中挑选部分属性
type TodoBrief = Pick<Todo, 'title' | 'completed'>;
const brief: TodoBrief = { title: '学习 TS', completed: false };
console.log(`简要: ${brief.title} - ${brief.completed ? '✅' : '⬜'}`);

// Omit<T, K> —— 从 T 中排除部分属性
type TodoWithoutDate = Omit<Todo, 'createdAt'>;
const withoutDate: TodoWithoutDate = {
    title: '购物',
    description: '买水果',
    completed: false,
};
console.log(`排除日期: ${withoutDate.title}`);

// Record<K, V> —— 构造一个键为 K、值为 V 的对象类型
type Page = 'home' | 'about' | 'contact';
const pageTitles: Record<Page, string> = {
    home: '首页',
    about: '关于我们',
    contact: '联系我们',
};
console.log(`页面标题: ${JSON.stringify(pageTitles)}`);


// 第十章：类型断言与类型缩小


console.log('\n========== 第十章：类型断言 & 缩小 ==========\n');

// as 类型断言 —— 你比 TS 更清楚类型时使用
let someValue: unknown = '这是一个字符串';
let strLength: number = (someValue as string).length;
console.log(`字符串长度: ${strLength}`);

// in 操作符缩小类型
interface Bird {
    fly(): void;
    wings: number;
}

interface Fish {
    swim(): void;
    fins: number;
}

function moveAnimal(animal: Bird | Fish): void {
    if ('wings' in animal) {
        console.log(`鸟有 ${animal.wings} 只翅膀，正在飞`);
    } else {
        console.log(`鱼有 ${animal.fins} 个鳍，正在游`);
    }
}

const eagle: Bird = { wings: 2, fly: () => {} };
const salmon: Fish = { fins: 6, swim: () => {} };

moveAnimal(eagle);
moveAnimal(salmon);


// 总结


console.log('\n========== 🎉 教程结束 ==========');
console.log(`
TypeScript 核心概念回顾:
    ✅ 基础类型: string, number, boolean, array, tuple, enum
    ✅ 接口 (interface): 定义对象形状、函数签名
    ✅ 类型别名 (type): 给类型起名字、联合类型
    ✅ 函数: 参数类型、返回值类型、可选参数、剩余参数
    ✅ 类 (class): 继承、访问修饰符 (public/private/protected)
    ✅ 泛型 (generics): 让代码既灵活又安全
    ✅ 工具类型: Partial, Readonly, Pick, Omit, Record

下一步:
    → 运行 npm run dev:demo2 学习进阶内容
    → 运行 npm run build 体验编译过程
    → 查看 dist/ 目录了解编译结果
`);

// 使文件成为独立模块，避免多文件编译时命名冲突
export {};
