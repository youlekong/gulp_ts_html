### 项目相关

#### 工具

- gulp

- typescript

#### 流程

- gulpfile.ts文件gulp default task => build-ts task => 入口文件app/Main.ts

- Main.ts文件Core.route.init()

- Route.ts文件Core.viewManager.openView()

- ViewManager.ts文件获取数据Net.getData(), ViewBase.add()

- ViewBase.ts文件，钩子方法，dom操作onCreate()，根节点代理点击事件onClick()，onEnable()


