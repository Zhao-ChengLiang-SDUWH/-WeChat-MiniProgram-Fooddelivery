
| 姓名   | 学号         |
| ------ | ------------ |
| 赵呈亮 | 201800820179 |
| 盛靖斐 | 201800820133 |
| 许函嘉 | 201800820045 |
| 徐潇涵 | 201800820149 |
| 闫文超 | 201800820236 |

#数据库结构
graph TB
   id("云数据库") --> A("用户")
   id("云数据库") --> B("未完成订单")
   id("云数据库") --> C("历史订单")
   id("云数据库") --> D("商品")
   id("云数据库") --> E("商家")
   A("用户")--- A1(所有用户的信息)
   B("未完成订单")---B1(只保留当前订单)
   C("历史订单")---C1(所有完成订单)
   D("商品")---D1(所有商品)
   E("商家")---E1(商家相关信息)

# 登录界面及个人界面

### 登录页面

由于有用户、骑手、商家三个身份，在登录界面可自己选择身份，随即跳转到相应界面

<img src="https://s1.ax1x.com/2020/03/15/83giyF.png" style="zoom:60%;" />

### 个人界面

#### 用户个人界面

- 第一次登录后弹窗提醒完善信息，进入我的信息界面

  <img src="https://s1.ax1x.com/2020/03/15/83gMQO.png" style="zoom:60%;" />

- <img src="https://s1.ax1x.com/2020/03/15/83gtYt.png" style="zoom:60%;" />

  - 点击头像可拍摄或选择相册中的图片更改头像

  - 点击我的收藏显示已收藏店铺，点击店铺即可进入商家页面；点击编辑可以管理已收藏店铺

    <img src="https://s1.ax1x.com/2020/03/15/83gdl8.png" style="zoom:60%;" />

  - 点击我的信息可更改

    - 昵称
    - 性别
    - 电话号码
    - 所在学院

    <img src="https://s1.ax1x.com/2020/03/15/83gI0J.png" style="zoom:60%;" />

    点击收货地址显示已有地址，点击新建地址可增加新地址，点击已有地址可更改信息

    新建地址需要的信息和已有地址可更改的信息有

    - 收货地址（自动定位）
    - 门牌号（选填）
    - 联系人
    - 手机号

    <img src="https://s1.ax1x.com/2020/03/15/83g7kR.png" style="zoom:60%;" />

    <img src="https://s1.ax1x.com/2020/03/15/83gxne.png" style="zoom:60%;" />

#### 骑手个人界面

- 与用户个人界面类似，第一次进入时弹窗提醒完善信息

- 与用户不同，因为需要确保骑手的真实身份，个人信息中增加了真实姓名与学号

  <img src="https://s1.ax1x.com/2020/03/15/8329AA.png" style="zoom:60%;" />

  <img src="https://s1.ax1x.com/2020/03/15/83gcYq.png" style="zoom:60%;" />

#### 商家修改店铺信息页面

- 显示商家头像、店铺名称以及描述

  点击头像即可打开相机拍照或相册选择图片更改头像

<img src="https://s1.ax1x.com/2020/03/17/8NuaCR.png" style="zoom:60%;" />

- 点击前往设置信息即可更改

  - 店铺名称
  - 店铺联系电话
  - 店铺描述
  - 店铺地址

- 店铺平均价格

  - 店铺标签
  - 起送价
  - 配送费
  - 餐盒费
  - 新用户减款
  - 满减额度
  - 优惠金额

  <img src="https://s1.ax1x.com/2020/03/17/8NKlid.png" style="zoom:60%;" />



# 主页面

用户进入主界面后，有很多选择

<img src="https://s1.ax1x.com/2020/03/17/8URf8e.png" alt="截屏2020-03-17下午4.31.13" style="zoom:50%;" />



可以点击进入商家界面，进行下单等操作。



### 定时提醒页面

<img src="https://s1.ax1x.com/2020/03/17/8URBv9.png" style="zoom:40%;" />

可以添加提醒 包括选择提醒时间 提醒日期 

<img src="https://s1.ax1x.com/2020/03/17/8URTbt.png" alt="截屏2020-03-17下午4.51.01" style="zoom:30%;" />

### 订单页面

<img src="https://s1.ax1x.com/2020/03/17/8URIKA.png" alt="截屏2020-03-17下午4.35.07" style="zoom:40%;" />

### 娱乐页面

#### 学院排行







<img src="https://s1.ax1x.com/2020/03/17/8UR24O.png" alt="截屏2020-03-17下午4.35.14" style="zoom:40%;" />

#### 个人消费

<img src="https://s1.ax1x.com/2020/03/17/8URyHx.png" alt="截屏2020-03-17下午4.35.23" style="zoom:40%;" />



### 商家页面

![image-20200315173515281](https://s1.ax1x.com/2020/03/17/8NjhVS.png)

- 显示商家的各项信息
- 收藏按钮可以收藏该店家并更新数据库
- 食物侧栏可以点击跳转到所包含的食物位置
- 食物列表可以上下滑动
- 购物车可以点击查看所选食物并且可以增加或者减少
- ![image-20200315173714376](https://s1.ax1x.com/2020/03/17/8NvZIe.png)

### 下单页面

![image-20200315173744682](https://s1.ax1x.com/2020/03/17/8Nv1qf.png)

- 可以选择用户地址
- 可以自己添加地址 跳转到地址添加页面
- 商品列表包含上一个页面所选视频信息
- 其他费用包含商家配送费与餐盒费
- 总价格为食物费用+商家配送费+参合费-满减-新用户折扣（如果是新用户）
- ![image-20200315173858339](https://s1.ax1x.com/2020/03/17/8NvGdS.png)
- 支付按钮受起送费限制，如达不到起送价格则处于禁用状态
- ![](https://s1.ax1x.com/2020/03/17/8NvURs.png)

- 点击确认支付会选择支付方式
- ![image-20200315175321389](https://s1.ax1x.com/2020/03/17/8Nv4L6.png)

- 然后输入支付密码
- ![image-20200315175401149](https://s1.ax1x.com/2020/03/17/8NxSw8.png)

- 支付成功跳转回商家界面
- ![image-20200315175417688](https://s1.ax1x.com/2020/03/17/8NxkSs.png)











#### 骑手订单页面

###### 我的订单

* 骑手登陆后，首先进入我的订单，显示个人已接收且正在配送的订单，订单以列表的形式排列，便于骑手看到关键信息，如配送地址、本单所得运费等，考虑骑手配送过程中的紧迫性，订单详情未单独另起页面，而是以隐藏栏的形式存放，点击详情，查看订单更多详细信息。

<img src="https://s1.ax1x.com/2020/03/17/8NDLBF.png"  />

* 订单送达后，点击完成订单，会获取当前时间地址，向用户发送取餐提醒，并同时更新订单状态，添加送达时间、准时情况等信息，将订单移至历史订单的集合，并删除订单集合中的该订单，防止订单堆积，减慢页面加载查询速度。

  <img src="https://s1.ax1x.com/2020/03/17/8NDjAJ.png"  />



###### 历史订单

* 该页面显示骑手已完成的订单情况，显示的关键信息改为略有更改

  <img src="https://s1.ax1x.com/2020/03/17/8NDxhR.png"  />



###### 待接订单

* 该页面显示所有商家已接单并等待配送的订单，将运费等突出显示，方便骑手判断

<img src="https://s1.ax1x.com/2020/03/17/8Nshzq.png"/>

* 接单按钮放在更多详情中，防止手滑触碰，若骑手对某个订单感兴趣，可点击更多详情获取订单详细信息并接收订单，点击接收订单按钮，将更改订单状态，订单移至我的订单

  <img src="https://s1.ax1x.com/2020/03/17/8N64bT.png"/>











## 外卖小程序——商家端

- 由于未注册商家的普通用户无法登陆饿了么和美团的商家版，无法很好地和两者进行比较，仅参考了app store的一些图片，以自己的想法为主。

- 商家端主要分为三个主页面，分别为：

  1. 订单处理
  2. 商品管理
  3. 我的店铺

  下面按照主页面顺序进行说明。



###  订单处理

#### 主页面内容及对应功能

==订单列表页面==

[<img src="https://s1.ax1x.com/2020/03/17/8NxfhQ.png" alt="8NxfhQ.png" style="zoom:50%;" />](https://imgchr.com/i/8NxfhQ)

1. **订单状态标签栏**，对不同阶段的订单的分类、筛选。根据整个订单流程，将订单按戒断状态分为以下几类：

   [<img src="https://s1.ax1x.com/2020/03/17/8Nxc0f.png" alt="8Nxc0f.png" style="zoom:67%;" />](https://imgchr.com/i/8Nxc0f)

   

   - 待接单：用户的新订单

   - 出餐中：商家正在处理的订单

   - 已接单：骑手已经取货的订单

   - 退消单：用户退货、退款的订单

   - 异常单：出现特殊情况的订单（如丢失、损坏）

   - 历史订单：成功送达的订单

     

2. **搜索栏**，按下单用户名进行订单搜索。

   - 支持查询功能和订单筛选功能的叠加使用

     [<img src="https://s1.ax1x.com/2020/03/17/8Nx6nP.png" alt="8Nx6nP.png" style="zoom: 67%;" />](https://imgchr.com/i/8Nx6nP)

     

3. **订单卡片**，简略显示订单的主要信息。从左至右、上至下显示如下信息：

   - 当前所选订单状态标签对应的订单数目（待接单、出餐中……）

   - 下单时间

   - 订单状态（和当前所选订单状态标签一致）

   - 下单者昵称

   - 下单者地址

   - 商品简略信息

   - 原价和实付价

     [<img src="https://s1.ax1x.com/2020/03/17/8Nxg78.png" alt="8Nxg78.png" style="zoom:67%;" />](https://imgchr.com/i/8Nxg78)





#### 子页面内容及对应功能

==点击主页免的“订单卡片”进入对应的订单详情子页面==

1. **订单详细卡片**，在主页面订单卡片展示信息的基础上增添如下信息：

   - 商家接单时间、骑手取货时间、骑手送达时间（实时更新显示）

   - 接单骑手姓名

   - 商品明细（名称、数量、价格）

   - 商家优惠明细

   - 订单id号

   - 下单时间、完成时间

     [<img src="https://s1.ax1x.com/2020/03/17/8NxRAS.png" alt="8NxRAS.png" style="zoom:50%;" />](https://imgchr.com/i/8NxRAS)

     

2. **接单按钮**，实现商家接单功能。

   - 自动同步更改订单状态（待接单——>出餐中）

   - 自动跳转回主页面，并实现订单列表的自动更新

     

     [<img src="https://s1.ax1x.com/2020/03/17/8NxIcn.png" alt="8NxIcn.png" style="zoom:50%;" />](https://imgchr.com/i/8NxIcn)



#### 优点

1. 通过给订单设置“condition”字段，将订单按照整个外卖流程划分明细，便于商家对订单的管理。

2. 考虑到商家查看最频繁的是未完成订单，因此将已完成的订单存放至数据库中新的collection，与未完成的订单collection进行区分，可以减少商家查看未完成订单时对数据库的遍历时间。

3. 实时更新显示在页面上的不同状态的订单数，有助于商家时刻对营业情况有大致了解。也可以实时查看月售单数。

4. 订单自动按下单时间升序排列。老订单在前，新订单在后，符合商家处理订单的逻辑顺序。

   

### 商品管理

#### 主页面内容及对应功能

1. **筛选标签栏**，可按照商品的种类和不同的排列顺序对商品进行筛选、排列。具体如下图：
   - 可实现种类筛选和排序的功能叠加
   - 若不选择特殊排序方式则以商品id号进行升序排列

[<img src="https://s1.ax1x.com/2020/03/17/8NxoXq.png" alt="8NxoXq.png" style="zoom:50%;" />](https://imgchr.com/i/8NxoXq)[<img src="https://s1.ax1x.com/2020/03/17/8Nx7n0.png" alt="8Nx7n0.png" style="zoom:50%;" />](https://imgchr.com/i/8Nx7n0)



 2. **搜索栏**，可根据商品id（商家自定义）进行搜索。

    - 可与筛选、排序功能叠加

      

3. **商品卡片**，如图，按左至右、上至下顺序显示如下信息：

   [<img src="https://s1.ax1x.com/2020/03/17/8NxONF.png" alt="8NxONF.png" style="zoom:80%;" />](https://imgchr.com/i/8NxONF)

   - 商品id：999

   - 商品图片

   - 商品名称：终极测试

   - 商品描述：整个小程序的终极测试数据！

   - 商品销量：0

   - 商品评分：5

   - 商品类别：热销

   - 商品价格：12345678

   - 商品货存量：1

     

4. **下架功能**，点击商品卡片上的“下架”按钮可下架对应商品。

   - 弹出确认提示
   - 确认后在对应collection中删除对应记录

[<img src="https://s1.ax1x.com/2020/03/17/8Nxv9J.png" alt="8Nxv9J.png" style="zoom:67%;" />](https://imgchr.com/i/8Nxv9J)



#### 子页面内容及对应功能

1. **添加新商品**。点击左下角添加商品按钮进入添加商品子页面。

   - 按要求输入商品信息后（支持上传图片）可添加新记录至对应collection（底部有确认按钮）

   [<img src="https://s1.ax1x.com/2020/03/17/8Nxx39.png" alt="8Nxx39.png" style="zoom:50%;" />](https://imgchr.com/i/8Nxx39)

   

2. **编辑已有商品**。点击商品卡片的“编辑”按钮，跳转至编辑商品子页面。

   - 自动显示商品现有的信息
   - 更改完成后在collection中更新对应记录（底部有确认按钮）

   [<img src="https://s1.ax1x.com/2020/03/17/8NxzcR.png" alt="8NxzcR.png" style="zoom:50%;" />](https://imgchr.com/i/8NxzcR)



#### 优点

1. 商品种类固定，针对学校餐饮种类较为固定和集中的特点，既满足学校环境下店家的分类需求，也方便学校管理方对校园餐饮进行管理

2. 支持多种组合的排序查询，其中货存查询是个新的想法。

3. 商家可自定义每个商品的专属id号，增加商家对自己商品的管理自由度

   

###  我的店铺

[<img src="https://s1.ax1x.com/2020/03/17/8Nz9nx.png" alt="8Nz9nx.png" style="zoom:50%;" />](https://imgchr.com/i/8Nz9nx)

#### 主页面内容及对应功能

1. **显示商家主要信息**。图示所有数据（除送达时间）皆为动态渲染，而非写死的数据。

   - 月售单（有效单）根据对该商家历史订单collection进行遍历，获取查询数据并显示到页面
   - 商家可自定义其起送费、配送费、满减优惠等信息

[<img src="https://s1.ax1x.com/2020/03/17/8NzPHK.png" alt="8NzPHK.png" style="zoom:67%;" />](https://imgchr.com/i/8NzPHK)



2. **更改商家营业状态**，通过点击“营业中”按钮，跳出弹出窗，更改商家记录里对应的condition字段。

   [<img src="https://s1.ax1x.com/2020/03/17/8NzkND.png" alt="8NzkND.png" style="zoom:67%;" />](https://imgchr.com/i/8NzkND)

   

3. **商家详细信息页面**，点击商家卡片进入商家详情页面。

   [<img src="https://s1.ax1x.com/2020/03/17/8NzegA.png" alt="8NzegA.png" style="zoom:67%;" />](https://imgchr.com/i/8NzegA)

   

4. **编辑商家信息**，点击“修改店铺信息”进入修改商家信息（包括头像）界面

   - 头像可预览（点击图像进行更改）
   - 自动显示商家已有信息

   

   


   [<img src="https://s1.ax1x.com/2020/03/17/8NzmjI.png" alt="8NzmjI.png" style="zoom:67%;" />](https://imgchr.com/i/8NzmjI)



[<img src="https://s1.ax1x.com/2020/03/17/8NzMHf.png" alt="8NzMHf.png" style="zoom:50%;" />](https://imgchr.com/i/8NzMHf)



[<img src="https://s1.ax1x.com/2020/03/17/8Nz34g.png" alt="8Nz34g.png" style="zoom:50%;" />](https://imgchr.com/i/8Nz34g)



#### 子页面内容及对应功能

==实现了部分界面显示，还无法完全实现所有功能，仅做展示==

1. **一键呼叫（客服、客户、经理）**

   [<img src="https://s1.ax1x.com/2020/03/17/8NzGCQ.png" alt="8NzGCQ.png" style="zoom:50%;" />](https://imgchr.com/i/8NzGCQ)

   

2. **查看收入**

   [<img src="https://s1.ax1x.com/2020/03/17/8NzJ3j.png" alt="8NzJ3j.png" style="zoom: 50%;" />](https://imgchr.com/i/8NzJ3j)

   

   - 去提现

     [<img src="https://s1.ax1x.com/2020/03/17/8Nztvn.png" alt="8Nztvn.png" style="zoom:50%;" />](https://imgchr.com/i/8Nztvn)

     [<img src="https://s1.ax1x.com/2020/03/17/8NzdbV.png" alt="8NzdbV.png" style="zoom: 50%;" />](https://imgchr.com/i/8NzdbV)

   
