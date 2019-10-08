# English_study_bar
一个针对英语提升的在线学习的网站

* git clone 'URL'下载项目后运行：
    > npm install (下载所有所有需要的包,会出现node_modules文件)
    > npm run serve (在开发环境运行)
    > 点击出现的本地链接即可出现页面

* 注意，本项目需要用到mongdodb，可下载Studio 3T 来视图化数据库；另外在vue.config.js文件中有“保存数据到数据库”以及“正常运行（需要有数据在数据库里）”,如果是前者，那么可将数据格式化并放入src/assets/data/***.js中，并修改./common/insertdbData.js文件即可自动保存文件到数据库中
