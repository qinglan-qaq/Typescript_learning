// 设置静态类型
// 常见类型包括 number、string、boolean、array、tuple、enum 等
let name: string = 'Alice';

let age: number = 30;

// 当然也可以不用显式声明类型，TS 会自动推断

// TS 推断为 string
let Alice_name = 'Alice';
// TS 推断为 number
let Alice_age = 30;

// 同样的还可以进行对象开发
// 接口（Interface）定义对象的结构 属性 方法
interface Person {
    name: string;
    age: number;
    greet(): void;
}

class Student implements Person {
    // 构造函数实例化对象时传入 name 和 age 参数
    constructor(
        public name: string,
        public age: number,
    ) {}

    greet() {
        console.log(`Hello, I'm ${this.name} and I'm ${this.age} years old.`);
    }
}

// 别名（Type Alias）为类型创建一个新名字

type ID = number | string; // ID 可以是数字或字符串
let Alice_id: ID = 12345; // 可以是数字
Alice_id = 'abcde'; // 也可以是字符串

// 引入枚举

enum Color {
    Red,
    Green,
    Blue,
}

let flower_color: Color = Color.Red;

// 引入元组（Tuple）可以表示一个已知元素数量和类型的数组

let point: [number, number] = [10, 20];

// 访问控制修饰符 (Access Modifiers)
// TypeScript 在类中提供了 public、private 和 protected 修饰符，允许控制属性或方法的可见性，支持更好的封装.
class Employee {
    private salary: number; // 私有属性，外部无法访问
    protected department: string; // 受保护属性，子类可以访问
    public name: string; // 公共属性，任何地方都可以访问

    constructor(name: string, salary: number, department: string) {
        this.name = name;
        this.salary = salary;
        this.department = department;
    }
}

// 8. 抽象类 (Abstract Classes)
// TypeScript 支持抽象类，抽象类不能直接实例化，需要由子类实现。抽象类适用于定义通用行为和抽象方法的类层次结构.
// 顶层设计 设计制定框架
abstract class Animal {
    abstract makeSound(): void; // 抽象方法，必须由子类实现
}

class Dog extends Animal {
    makeSound() {
        console.log('Woof!');
    }
}

// 9. 泛型 (Generics)

// TypeScript 支持泛型，允许在类、接口和函数中使用参数化类型，使得代码可以适应不同的类型需求，同时保持类型安全.泛型（Generics）是消除重复代码、保证类型安全的核心武器

// 这里的每一个"T" 都是一个占位符，代表调用时传入的具体类型
// 所以泛型表达的意思是对于每一个T类型的参数arg，函数都会返回一个同样类型的值
function identity<T>(arg: T): T {
    return arg;
}

let num = identity<number>(42);

// 11. 类型守卫 (Type Guards)

// TypeScript 提供了类型守卫，可以在代码中检查变量类型，帮助编译器推断更加具体的类型。这对于联合类型尤为重要。

function printID(id: number | string) {
    if (typeof id === 'number') {
        console.log(`ID 是数字: ${id}`);
    } else {
        console.log(`ID 是字符串: ${id}`);
    }
}

// 12. 可选链和空值合并运算符

// TypeScript 增加了 JavaScript 的可选链 (?.) 和空值合并运算符 (??)，简化了代码中对可能为 null 或 undefined 值的处理。

let user = { name: 'Alice', address: { city: 'Wonderland' } };
console.log(user?.address?.city); // 如果 address 存在则输出 city，否则返回 undefined 注意: "?."是一体的

let value = null;
console.log(value ?? 'default'); // 如果 value 为 null 或 undefined，则返回 "default"

/*
12. 异步编程（Asynchronous Programming）

TypeScript 完全支持异步编程，可以使用 async/await 语法来处理异步操作。
*/
async function fetchData(): Promise<string> {
    const response = await fetch('https://www.bilibili.com/');
    const data = await response.text();
    return data;
}

/*
13. 错误处理（Error Handling）

TypeScript 允许使用 try/catch 块进行错误处理，还可以使用类型来描述错误的类型。
*/
try {
    throw new Error('Something went wrong');
} catch (error) {
    if (error instanceof Error) {
        console.error(error.message);
    }
}