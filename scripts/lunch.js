// 餐厅列表
const restaurants = [
    "陕西面馆",
    "麦当劳",
    "食堂",
    "西江美食坊",
    "鸡蛋灌饼",
    "羊肉泡馍",
    "木屋烧烤",
    "夺夺粉火锅",
    "山西刀削面",
    "巴依老爷",
    "米奇妙妙屋",
    "宫丸居酒屋",
    "牛肉板面",
    "和府捞面",
    "袁记云饺",
    "渝是乎",
    "呷哺呷哺",
    "陕味十足",
    "KFC",
    "真功夫",
    "牛汤哥",
    "健翔新开肉饼店",
    "正一味韩餐",
    "半汤抄手",
    "一面一城",
    "冯记豆花",
    "内蒙烧卖",
    "吉二姐铁锅炖",
    "旋转小火锅",
    "云南菜",
    "半步颠小酒馆",
    "考焰所",
    "烧饼夹里脊",
    "宫廷牛肉饼",
    "北华涮肉",
    "小郡肝串串香",
    "庆丰包子",
    "武圣羊汤",
    "湘赣土菜馆",
    "武圣羊汤旁边的麻辣串",
    "宏状元",
    "老边饺子",
    "疯狂烤牛骨",
    "蜀香味",
    "金三根",
    "东方宫",
    "黄焖鸡米饭",
    "宁夏滩羊",
    "金竹轩",
    "奥林匹克公园地铁站地下小吃街",
    "北投购物中心",
    "新奥购物中心",
    "芙蓉国",
    "安贞门环宇荟"
];

// 获取按钮和结果显示元素
const generateBtn = document.getElementById('generateBtn');
const resultElement = document.getElementById('result');

// 计数器
let clickCount = 0;

// 随机生成餐厅
function generateRestaurant() {
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    resultElement.textContent = restaurants[randomIndex];

    // 增加计数器
    clickCount++;

    // 根据点击次数弹出提示
    if (clickCount === 5) {
        alert("这么挑食？");
    } else if (clickCount === 12) {
        alert("不饿的话，怎么点击也选不出来哦~");
    } else if (clickCount === 20) {
        alert("你别吃了！再见！");
        // 禁用按钮
        generateBtn.style.display = "none"; // 隐藏按钮
    }
}

// 绑定按钮点击事件
generateBtn.addEventListener('click', generateRestaurant);