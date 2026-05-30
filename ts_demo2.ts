/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║       TypeScript 进阶教程 —— 深入理解 TS 核心特性           ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * 运行方式：npm run dev:demo2
 * 前置：建议先学习 ts_demo1.ts 的基础内容
 */

// ──────────────────────────────────────────────────────────
// 第一章：高级类型操作
// ──────────────────────────────────────────────────────────

console.log('========== 第一章：高级类型操作 ==========\n');

// 1.1 交叉类型 (Intersection Types) —— 合并多个类型
interface Nameable {
    name: string;
}
interface Ageable {
    age: number;
}

type Person = Nameable & Ageable; // 同时拥有 name 和 age

const employee: Person = { name: '李四', age: 35 };
console.log(`员工: ${employee.name}, ${employee.age}岁`);

// 1.2 字面量类型 —— 精确到某个值
type Direction = 'left' | 'right' | 'up' | 'down';
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function move(direction: Direction, steps: number): void {
    console.log(`向 ${direction} 移动 ${steps} 步`);
}
move('up', 3);

// 1.3 keyof —— 获取对象类型的所有键
interface Car {
    brand: string;
    model: string;
    year: number;
}

type CarKeys = keyof Car; // "brand" | "model" | "year"

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

const myCar: Car = { brand: 'Toyota', model: 'Camry', year: 2024 };
console.log(`品牌: ${getProperty(myCar, 'brand')}`);
console.log(`年份: ${getProperty(myCar, 'year')}`);

// ──────────────────────────────────────────────────────────
// 第二章：泛型进阶
// ──────────────────────────────────────────────────────────

console.log('\n========== 第二章：泛型进阶 ==========\n');

// 2.1 泛型类
class Stack<T> {
    private items: T[] = [];

    push(item: T): void {
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    get size(): number {
        return this.items.length;
    }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log(`栈大小: ${numberStack.size}`);
console.log(`栈顶: ${numberStack.peek()}`);
console.log(`弹出: ${numberStack.pop()}`);
console.log(`剩余大小: ${numberStack.size}`);

const stringStack = new Stack<string>();
stringStack.push('Hello');
stringStack.push('World');
console.log(`弹出: ${stringStack.pop()}`);

// 2.2 泛型约束实战 —— 确保对象有特定属性
interface HasId {
    id: number;
}

class Repository<T extends HasId> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    findById(id: number): T | undefined {
        return this.items.find((item) => item.id === id);
    }

    getAll(): T[] {
        return [...this.items];
    }
}

interface Product extends HasId {
    name: string;
    price: number;
}

const productRepo = new Repository<Product>();
productRepo.add({ id: 1, name: '键盘', price: 299 });
productRepo.add({ id: 2, name: '鼠标', price: 99 });
productRepo.add({ id: 3, name: '显示器', price: 1999 });

const found = productRepo.findById(2);
if (found) {
    console.log(`找到商品: ${found.name}, ¥${found.price}`);
}

// ──────────────────────────────────────────────────────────
// 第三章：条件类型与 infer
// ──────────────────────────────────────────────────────────

console.log('\n========== 第三章：条件类型 ==========\n');

// 3.1 条件类型 —— 根据条件选择类型
// 语法: T extends U ? X : Y
type IsString<T> = T extends string ? '是字符串' : '不是字符串';

type A = IsString<'hello'>; // "是字符串"
type B = IsString<42>; // "不是字符串"

// 3.2 提取数组元素类型
type ArrayItemType<T> = T extends (infer U)[] ? U : never;

type StringItem = ArrayItemType<string[]>; // string
type NumberItem = ArrayItemType<number[]>; // number

// 3.3 提取函数返回类型
type ReturnTypeCustom<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
    return { name: '王五', age: 40 };
}

type UserFromFunc = ReturnTypeCustom<typeof getUser>;
// UserFromFunc = { name: string; age: number }

console.log('条件类型示例在编译时运行，运行时看不到输出');
console.log('请阅读代码中的 type 定义来理解条件类型');

// ──────────────────────────────────────────────────────────
// 第四章：模板字面量类型 (TS 4.1+)
// ──────────────────────────────────────────────────────────

console.log('\n========== 第四章：模板字面量类型 ==========\n');

// 4.1 拼接字符串类型
type EventName = 'click' | 'focus' | 'blur';
type HandlerName = `on${Capitalize<EventName>}`;
// "onClick" | "onFocus" | "onBlur"

function registerEvent(event: HandlerName): void {
    console.log(`注册事件处理器: ${event}`);
}
registerEvent('onClick');
registerEvent('onFocus');

// 4.2 组合生成类型
type Color = 'red' | 'green' | 'blue';
type Size = 'small' | 'medium' | 'large';
type ThemeKey = `${Color}-${Size}`;
// "red-small" | "red-medium" | "red-large" | "green-small" | ...

const theme: Record<ThemeKey, string> = {
    'red-small': '#ffcccc',
    'red-medium': '#ff6666',
    'red-large': '#cc0000',
    'green-small': '#ccffcc',
    'green-medium': '#66ff66',
    'green-large': '#00cc00',
    'blue-small': '#ccccff',
    'blue-medium': '#6666ff',
    'blue-large': '#0000cc',
};
console.log(`主题 red-medium: ${theme['red-medium']}`);

// ──────────────────────────────────────────────────────────
// 第五章：映射类型 (Mapped Types)
// ──────────────────────────────────────────────────────────

console.log('\n========== 第五章：映射类型 ==========\n');

interface Config {
    host: string;
    port: number;
    secure: boolean;
}

// 5.1 把所有属性变成可选的
type OptionalConfig = {
    [K in keyof Config]?: Config[K];
};

const partialConfig: OptionalConfig = {
    host: 'localhost',
    // port 和 secure 可以不写
};
console.log(`部分配置: ${JSON.stringify(partialConfig)}`);

// 5.2 把所有属性变成只读的
type ReadonlyConfig = {
    readonly [K in keyof Config]: Config[K];
};

// 5.3 给每个属性加上 getter/setter 前缀
type AccessorConfig = {
    [K in keyof Config as `get${Capitalize<string & K>}`]: () => Config[K];
};

// 类型结果为:
// { getHost: () => string; getPort: () => number; getSecure: () => boolean }

// ──────────────────────────────────────────────────────────
// 第六章：类型守卫进阶
// ──────────────────────────────────────────────────────────

console.log('\n========== 第六章：类型守卫进阶 ==========\n');

// 6.1 自定义类型守卫 —— is 关键字
interface ApiResponse {
    success: boolean;
    data: unknown;
}

interface SuccessResponse extends ApiResponse {
    success: true;
    data: { user: string; token: string };
}

interface ErrorResponse extends ApiResponse {
    success: false;
    data: { message: string; code: number };
}

type LoginResponse = SuccessResponse | ErrorResponse;

// 自定义类型守卫：判断是否登录成功
function isSuccess(response: LoginResponse): response is SuccessResponse {
    return response.success === true;
}

function handleLogin(response: LoginResponse): void {
    if (isSuccess(response)) {
        // 这里 TS 知道 response 是 SuccessResponse
        console.log(`登录成功! 用户: ${response.data.user}, Token: ${response.data.token}`);
    } else {
        // 这里 TS 知道 response 是 ErrorResponse
        console.log(`登录失败: ${response.data.message} (错误码: ${response.data.code})`);
    }
}

const successResp: LoginResponse = {
    success: true,
    data: { user: 'admin', token: 'abc123' },
};

const errorResp: LoginResponse = {
    success: false,
    data: { message: '密码错误', code: 401 },
};

handleLogin(successResp);
handleLogin(errorResp);

// 6.2 断言函数 (TS 3.7+)
function assertIsString(value: unknown): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error(`期望 string，实际是 ${typeof value}`);
    }
}

function processInput(input: unknown): void {
    assertIsString(input);
    // 从这里开始，TS 知道 input 一定是 string
    console.log(`处理输入: ${input.toUpperCase()}`);
}

try {
    processInput('hello world');
    // processInput(123);  // 运行时会抛出异常
} catch (e) {
    // ignore for demo
}

// ──────────────────────────────────────────────────────────
// 第七章：装饰器模式（不用装饰器语法，用函数组合）
// ──────────────────────────────────────────────────────────

console.log('\n========== 第七章：函数组合模式 ==========\n');

// 高阶函数：接收函数，返回增强后的函数
function withLogging<T extends (...args: any[]) => any>(
    fn: T,
    label: string,
): (...args: Parameters<T>) => ReturnType<T> {
    return (...args: Parameters<T>): ReturnType<T> => {
        console.log(`[${label}] 调用，参数:`, args);
        const result = fn(...args);
        console.log(`[${label}] 返回:`, result);
        return result;
    };
}

function withTiming<T extends (...args: any[]) => any>(
    fn: T,
): (...args: Parameters<T>) => ReturnType<T> {
    return (...args: Parameters<T>): ReturnType<T> => {
        const start = performance.now();
        const result = fn(...args);
        const duration = performance.now() - start;
        console.log(`执行耗时: ${duration.toFixed(2)}ms`);
        return result;
    };
}

// 组合使用
function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const enhancedFib = withLogging(withTiming(fibonacci), 'fibonacci');
console.log(`fibonacci(10) = ${enhancedFib(10)}`);

// ──────────────────────────────────────────────────────────
// 第八章：错误处理模式
// ──────────────────────────────────────────────────────────

console.log('\n========== 第八章：Result 模式 (Rust 风格) ==========\n');

// 用类型系统保证错误处理不被遗漏
type Result<T, E = Error> = { success: true; value: T } | { success: false; error: E };

function safeDivide(a: number, b: number): Result<number, string> {
    if (b === 0) {
        return { success: false, error: '除数不能为零' };
    }
    return { success: true, value: a / b };
}

function safeParseJSON(json: string): Result<unknown, string> {
    try {
        return { success: true, value: JSON.parse(json) };
    } catch {
        return { success: false, error: 'JSON 格式无效' };
    }
}

// 使用 Result 模式
const divResult = safeDivide(10, 2);
if (divResult.success) {
    console.log(`10 / 2 = ${divResult.value}`);
} else {
    console.log(`错误: ${divResult.error}`);
}

const divError = safeDivide(10, 0);
if (!divError.success) {
    console.log(`错误: ${divError.error}`);
}

const jsonResult = safeParseJSON('{"name":"test","value":42}');
if (jsonResult.success) {
    console.log(`JSON 解析成功:`, jsonResult.value);
}

// ──────────────────────────────────────────────────────────
// 第九章：实战 —— Http 客户端封装
// ──────────────────────────────────────────────────────────

console.log('\n========== 第九章：实战练习 ==========\n');

// 模拟一个 HTTP 客户端，展示 TypeScript 在实际项目中的用法
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface RequestConfig<TBody = unknown> {
    method: HttpMethod;
    url: string;
    body?: TBody;
    headers?: Record<string, string>;
}

interface HttpResponse<TData> {
    status: number;
    data: TData;
    message: string;
}

// 模拟 fetch —— 实际项目中使用 axios 或 fetch API
async function httpClient<TData, TBody = unknown>(
    config: RequestConfig<TBody>,
): Promise<HttpResponse<TData>> {
    // 这里只是模拟，实际项目会真正发请求
    console.log(`[HTTP] ${config.method} ${config.url}`);

    // 模拟异步请求
    await new Promise((resolve) => setTimeout(resolve, 50));

    return {
        status: 200,
        data: { id: 1, ...config.body } as unknown as TData,
        message: 'OK',
    };
}

// 使用示例
interface CreateUserBody {
    name: string;
    email: string;
}

interface UserResponse {
    id: number;
    name: string;
    email: string;
    createdAt: string;
}

async function createUser(): Promise<void> {
    const response = await httpClient<UserResponse, CreateUserBody>({
        method: 'POST',
        url: '/api/users',
        body: {
            name: '新用户',
            email: 'user@example.com',
        },
        headers: {
            'Content-Type': 'application/json',
        },
    });

    console.log(`创建用户成功:`, response.data);
}

createUser().then(() => {
    console.log('\n========== 🎉 进阶教程结束 ==========');
    console.log(`
  进阶内容回顾:
    ✅ 交叉类型 (&): 合并多个类型
    ✅ keyof + 泛型约束: 安全的属性访问
    ✅ 泛型类: 类型安全的数据结构
    ✅ 条件类型 + infer: 编译时类型变换
    ✅ 模板字面量类型: 拼接字符串类型
    ✅ 映射类型: 批量变换类型属性
    ✅ 自定义类型守卫: is 断言函数
    ✅ Result 模式: 类型安全的错误处理
    ✅ 实战模式: HTTP 客户端封装

  继续学习方向:
    → tsconfig.json 各配置项含义
    → 声明文件 (.d.ts) 编写
    → 模块化与命名空间
    → 与 React / Vue / Node.js 集成
  `);
});

// 使文件成为独立模块，避免多文件编译时命名冲突
export {};
