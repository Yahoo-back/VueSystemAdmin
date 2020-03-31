<template>
  <div style="height:100%;overflow: auto;overflow-x: hidden">
    <div class="logo-con" :style="{background: menuTheme !== 'dark'?'#22282e':''}">
      <!--展开时左侧上面的图片-->
      <div style="margin-bottom: 10px">
        <!-- <img v-show="!sidebar" style="width: 26px; height: 26px;float:left;margin-left: 5px" src="../../assets/logo.png"/> -->
        <h2 class="leftTitle" @click="herfchange" v-show="!sidebar">瑞幸分期后台管理系统</h2>
      </div>
      <!--菜单收起时左侧显示的图片-->
      <a @click="herfchange" v-show="sidebar"><img style="width: 26px; height: 26px" src="../../assets/logo.png"/></a>
    </div>
      <Menu :selectedKeys="[$route.path]" v-if="!sidebar" ref="sideMenu" :active-name="$route.path" :theme="menuTheme" :open-names="openedSubmenuArr"
          width="auto" @on-select="changeMenu">
      <template v-for="item in menus" v-if="!item.hidden && item.children && item.children.length>0  && item.children[0].uri.split('/')[0] === menu">
        <!--有二级菜单的设置路由-->
        <template v-for="child in item.children">
          <!--设置下面的二级菜单显示-->
          <MenuItem :name="'/'+child.uri"  >
            <!-- <Icon :type="icon" :size="iconSize" ></Icon> -->
            <i class="el-icon-aim"></i>
            <span class="layout-text">{{ child.muenName }}</span>
          </MenuItem>
        </template>
      </template>
      <template v-for="item in menus" v-if="!item.hidden && item.children && item.children.length>0 && item.children[0].uri.split('/')[1] === menu && item.muenid == 41 ">
        <template v-for="child in item.children">
          <MenuItem :name="'/'+child.uri"  >
            <i class="el-icon-aim"></i>
            <span class="layout-text" >{{ child.muenName }}</span>
          </MenuItem>
        </template>
      </template>
      <!-- <template v-for="item in menus" v-if="!item.hidden && item.children && item.children.length>0  && item.children[0].uri.split('/')[0] === 'report' && item.muenid ==17">
        <template v-for="child in item.children">
          <MenuItem :name="'/'+child.uri"  >
            <i class="el-icon-aim"></i>
            <span class="layout-text">{{ child.muenName }}</span>
          </MenuItem>
        </template>
      </template> -->
    </Menu>
    <div v-else-if="sidebar" class="shrink">
      <template v-for="(item,index) in menus" v-if="!item.hidden && item.children && item.children.length>0 && item.children[0].uri.split('/')[0] === menu ">
        <!--只展示选择的那个一级菜单的二级菜单-->
        <!--有二级菜单的展示-->
        <Dropdown transfer v-if="item.children.length !== 0" placement="right-start" :key="index"
                  @on-click="changeMenu">
        </Dropdown>
        <template v-for="(child, i) in item.children">
          <Dropdown transfer v-if="item.children && item.children.length !== 0" placement="right-start" :key="index"
                    @on-click="changeMenu">
                    <!-- 二级菜单页面跳转 -->
            <div tag='span'
                         style="display: inline-block;height:100%;width:100%">
              <el-button class="shrinkbutton" type="text">
                <Icon :size="20" :color="iconColor" :type="icon"/>
              </el-button>
            </div>
            <DropdownMenu class="shrinkdropdownMenu" slot="list">
              <DropdownItem :name="'/'+child.uri" :key="i">
                <span class="dropdownItemIcon">{{ child.muenName }}</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </template>
      <template v-for="(item,index) in menus" v-if="!item.hidden && item.children && item.children.length>0 && item.children[0].uri.split('/')[1] === menu && item.muenid === 41">
        <!--只展示选择的那个一级菜单的二级菜单-->
        <!--有二级菜单的展示-->
        <Dropdown transfer v-if="item.children.length !== 0" placement="right-start" :key="index"
                  @on-click="changeMenu">
        </Dropdown>
        <template v-for="(child, i) in item.children">
          <Dropdown transfer v-if="item.children && item.children.length !== 0" placement="right-start" :key="index"
                    @on-click="changeMenu">
                    <!-- 二级菜单页面跳转 -->
            <router-link tag='span' :to="child.uri"
                         style="display: inline-block;height:100%;width:100%">
              <el-button class="shrinkbutton" type="text">
                <Icon :size="20" :color="iconColor" :type="icon"/>
              </el-button>
            </router-link>
            <DropdownMenu class="shrinkdropdownMenu" slot="list">
              <DropdownItem :name="child.uri" :key="i">
                <span class="dropdownItemIcon">{{ child.muenName }}</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import {adminPermission} from '../../api/login';
  import {mapGetters} from 'vuex';
  export default {
    inject: ['reload'],
    data() {
      return {
        activeName: '',
        icon: "key",
        iconSize: 14,
        //当前选中导航的name
        menu: "",
        menus: [],
        menuTree: JSON.parse(localStorage.getItem('menuTree'))
      }
    },
    mounted() {
      this.activeName = this.$route.path;
      var menuTree = JSON.parse(localStorage.getItem('menuTree'));
      // console.log(menuTree)
      if(!menuTree) {
        return
      }else {
        var uri = menuTree.uri;
      }
      this.getMenu()
    },
    created () {
       this.getMenu();
    },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar',
        // 'activeName'
      ]),
      menuTheme() {
        // console.log(this.$store.state.app.menuTheme)
        return this.$store.state.app.menuTheme;
      },
      openedSubmenuArr() {
        let n = this.$route.path.split("/")[1];
        return [n];
      },
      iconColor() {
        return this.$store.state.app.menuTheme === 'dark' ? 'white' : '#22282e';
      },
    },
    methods: {
      getMenu() {
        const userIds = localStorage.getItem('userId')
        //获取权限接口
        adminPermission({userId: userIds}).then(res=>{
          // var menu = JSON.stringify(res.data.data);
          var menu = res.data.data;
          // console.log(menu)
          function list(myId,pId,menu){
          // console.log(menu)
            function exists(menu, parentMuenId){
              for(var i=0; i<menu.length; i++){
                if (menu[i][myId] == parentMuenId) return true;
              }
              return false;
            }
            var nodes = [];
            // get the top level nodes
            for(var i=0; i<menu.length; i++){
              var row = menu[i];
              if (!exists(menu, row[pId])){
                nodes.push(row);
                // console.log(nodes)
              }
            }
            var toDo = [];
            for(var i=0; i<nodes.length; i++){
              toDo.push(nodes[i]);
            }
            while(toDo.length){
              var node = toDo.shift(); // the parent node
              // get the children nodes
              for(var i=0; i<menu.length; i++){
                var row = menu[i];
                if (row[pId] == node[myId]){
                  //var child = {id:row.id,text:row.name};
                  if (node.children){
                    node.children.push(row);
                  } else {
                    node.children = [row];
                  }
                  toDo.push(row);
                }
              }
            }
            return nodes;
            // console.log(nodes)
          }
          var menuTree = list("muenid","parentMuenId",menu);
          // console.log(menuTree)
          var m = JSON.stringify(menuTree)
          // console.log(m)
          this.menus = JSON.parse(m);
          // console.log(this.menus)
          // localStorage.setItem('menuTree',m);
          // //将菜单存储至本地
          // var menuTree = JSON.parse(localStorage.getItem('menuTree'))
          // console.log(menuTree)
          // localStorage.setItem('menu',menu);

        })
      },
      changeMenu(active) {
        this.$emit("select", active);
        var actives = active.replace('//','/')
        // console.log(actives)
        this.$router.push(actives);
        // this.$emit("select", active);
        // this.$router.push(active);

        //实时点击菜单刷新
        // this.reload()
      },
      changeNavMenu(url) {
        if(url == 'role' || url == 'meun') {
          url = 'users'
          // console.log(url)
        }
        if(url == 'qd') {
          url = 'qudao'
          // console.log(url)
        }
        if(url == 'report') {
          url = 'report'
          // console.log(url)
        }
        this.menu = url;
        // console.log(url)
      },
      herfchange() {
        let path = "/";
        this.$router.push(path);
        this.menu = path;
      },
    }
  }
</script>

<style lang="less">
  .leftTitle {
    color: #fff;
    // margin-right: 5px;
    // float:right;
    padding-top: 10px;
  }
  .ivu-btn {
    border: none;
  }
  .shrink {
    text-align: center;
    .shrinkbutton {
      width: 65px;
      padding: 10px 0;
    }
    .shrinkdropdownMenu {
      width: 200px;
    }
    .dropdownItemIcon {
      padding-left: 10px;
    }
  }
  .ivu-menu-dark {
    background: #22282e;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item{
    color: #fff;
  }
</style>



<!-- 侧面导航栏1-->
<!--
<template>
  <div style="height:100%;overflow: auto;overflow-x: hidden">
    <div class="logo-con" :style="{background: menuTheme !== 'dark'?'#22282e':''}">
      <h2 class="leftTitle" @click="herfchange" v-show="!sidebar">后台管理系统</h2>
      <a @click="herfchange" v-show="sidebar"><img style="width: 26px; height: 26px" src="../../assets/logo.png"/></a>
    </div>
    <Menu :selectedKeys="[$route.path]" v-if="!sidebar" ref="sideMenu" :active-name="$route.path" :theme="menuTheme" :open-names="openedSubmenuArr"
          width="auto" @on-select="changeMenu">
      <template v-for="item in menus" v-if="!item.hidden && item.children && item.children.length>0 && item.uri.split('/')[1] === menu">
        <template v-for="child in item.children">
          <MenuItem :name="item.uri+'/'+child.uri"  >
            <i class="el-icon-aim"></i>
            <span class="layout-text" >{{ child.muenName }}</span>
          </MenuItem>
        </template>
      </template>
    </Menu>
    <div v-else-if="sidebar" class="shrink">
      <template v-for="(item,index) in menus" v-if="!item.hidden && item.children && item.children.length>0 && item.uri.split('/')[1] === menu">
        <Dropdown transfer v-if="item.children.length !== 0" placement="right-start" :key="index"
                  @on-click="changeMenu">
        </Dropdown>
        <template v-for="(child, i) in item.children">
          <Dropdown transfer v-if="item.children && item.children.length !== 0" placement="right-start" :key="index"
                    @on-click="changeMenu">
            <router-link tag='span' :to="item.uri+'/'+child.uri"
                         style="display: inline-block;height:100%;width:100%">
              <el-button class="shrinkbutton" type="text">
                <Icon :size="20" :color="iconColor" :type="icon"/>
              </el-button>
            </router-link>
            <DropdownMenu class="shrinkdropdownMenu" slot="list">
              <DropdownItem :name="item.uri+'/'+child.uri" :key="i">
                <span class="dropdownItemIcon">{{ child.muenName }}</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import {adminPermission} from '../../api/login';
  import {mapGetters} from 'vuex';

  export default {
    inject: ['reload'],
    data() {
      return {
        icon: "key",
        iconSize: 14,
        //当前选中导航的name
        menu: "",
        menus: [],
        menuTree: JSON.parse(localStorage.getItem('menuTree'))
      }
    },
    mounted() {
      var menuTree = JSON.parse(localStorage.getItem('menuTree'));
      // console.log(menuTree)
      // var uri = menuTree.uri;
      if(!menuTree) {
        return
      }else {
        var uri = menuTree.uri;
      }

      this.getMenu()
    },
    created () {
       this.getMenu();
    },
    computed: {
      ...mapGetters([
        'permission_routers',
        'sidebar'
      ]),
      menuTheme() {
        return this.$store.state.app.menuTheme;
      },
      openedSubmenuArr() {
        let n = this.$route.path.split("/")[1];
        return [n];
      },
      iconColor() {
        return this.$store.state.app.menuTheme === 'dark' ? 'white' : '#22282e';
      },
    },
    methods: {
      getMenu() {
        const userIds = localStorage.getItem('userId')
        //获取权限接口
        adminPermission({userId: userIds}).then(res=>{
          // var menu = JSON.stringify(res.data.data);
          var menu = res.data.data;
          // console.log(menu)
          function list(myId,pId,menu){
          // console.log(menu)
            function exists(menu, parentMuenId){
              for(var i=0; i<menu.length; i++){
                if (menu[i][myId] == parentMuenId) return true;
              }
              return false;
            }
            var nodes = [];
            // get the top level nodes
            for(var i=0; i<menu.length; i++){
              var row = menu[i];
              if (!exists(menu, row[pId])){
                nodes.push(row);
                // console.log(nodes)
              }
            }
            var toDo = [];
            for(var i=0; i<nodes.length; i++){
              toDo.push(nodes[i]);
            }
            while(toDo.length){
              var node = toDo.shift(); // the parent node
              // get the children nodes
              for(var i=0; i<menu.length; i++){
                var row = menu[i];
                if (row[pId] == node[myId]){
                  //var child = {id:row.id,text:row.name};
                  if (node.children){
                    node.children.push(row);
                  } else {
                    node.children = [row];
                  }
                  toDo.push(row);
                }
              }
            }
            return nodes;
            // console.log(nodes)
          }
          var menuTree = list("muenid","parentMuenId",menu);
          // console.log(menuTree)
          var m = JSON.stringify(menuTree)
          // console.log(m)
          this.menus = JSON.parse(m);
          // console.log(this.menus)
          // localStorage.setItem('menuTree',m);
          // //将菜单存储至本地
          // var menuTree = JSON.parse(localStorage.getItem('menuTree'))
          // console.log(menuTree)
          // localStorage.setItem('menu',menu);
        })
      },
      changeMenu(active) {
        this.$router.push(active);
        //实时点击菜单刷新
        this.reload()
      },
      // refresh () {
      //   this.reload()
      // },
      changeNavMenu(url) {
        this.menu = url;
      },
      herfchange() {
        let path = "/";
        this.$router.push(path);
        this.menu = path;
      },
    }
  }
</script>

<style lang="less">
  .leftTitle {
    color: #fff;
    padding-top: 10px;
  }
  .ivu-btn {
    border: none;
  }
  .shrink {
    text-align: center;
    .shrinkbutton {
      width: 65px;
      padding: 10px 0;
    }
    .shrinkdropdownMenu {
      width: 200px;
    }
    .dropdownItemIcon {
      padding-left: 10px;
    }
  }
  .ivu-menu-dark {
    background: #22282e;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-item{
    color: #fff;
  }
</style>






<!-- <template> -->
  <!-- <div style="height:100%;overflow: auto;overflow-x: hidden">
    <div class="logo-con" :style="{background: menuTheme !== 'dark'?'#495060':''}"> -->
      <!--展开时左侧上面的图片-->
      <!-- <h2 class="leftTitle" @click="herfchange" v-show="!sidebar">后台管理系统</h2> -->
      <!--菜单收起时左侧显示的图片-->
      <!-- <a @click="herfchange" v-show="sidebar"><img style="width: 26px; height: 26px" src="../../assets/logo.png"/></a> -->
    <!-- </div>
    <Menu v-if="!sidebar" ref="sideMenu" :active-name="$route.path" :theme="menuTheme" :open-names="openedSubmenuArr"
          width="auto" @on-select="changeMenu">
      <template v-for="item in permission_routers"
                v-if="!item.hidden && item.children.length>0 && item.path.split('/')[1] === menu"> -->
        <!--有二级菜单的设置路由-->
        <!-- <template v-for="child in item.children"> -->
          <!--设置下面的二级菜单显示-->
          <!-- <MenuItem :name="item.path+'/'+child.path" :key="child.name">
            <Icon :type="child.icon" :size="iconSize" :key="child.name"></Icon>
            <span class="layout-text" :key="child.name">{{ child.title }}</span>
          </MenuItem>
        </template> -->
      <!-- </template>
    </Menu>
    <div v-else-if="sidebar" class="shrink">
      <template v-for="(item,index) in permission_routers"
                v-if="!item.hidden && item.children.length>0 && item.path.split('/')[1] === menu"> -->
        <!--只展示选择的那个一级菜单的二级菜单-->
        <!--有二级菜单的展示-->
        <!-- <Dropdown transfer v-if="item.children.length !== 0" placement="right-start" :key="index"
                  @on-click="changeMenu">
        </Dropdown>
        <template v-for="(child, i) in item.children">
          <Dropdown transfer v-if="item.children.length !== 0" placement="right-start" :key="index"
                    @on-click="changeMenu">
            <router-link tag='span' :to="item.path+'/'+child.path"
                         style="display: inline-block;height:100%;width:100%">
              <Button class="shrinkbutton" type="text">
                <Icon :size="20" :color="iconColor" :type="child.icon"/>
              </Button>
            </router-link>
            <DropdownMenu class="shrinkdropdownMenu" slot="list">
              <DropdownItem :name="item.path+'/'+child.path" :key="i">
                <Icon :type="child.icon"/>
                <span class="dropdownItemIcon">{{ child.title }}</span>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </template>
    </div>
  </div>
</template> -->

<!-- <script>

//   import {mapGetters} from 'vuex';

//   export default {
//     data() {
//       return {
//         iconSize: 14,
//         //当前选中导航的name
//         menu: ""
//       }
//     },
//     computed: {
//       ...mapGetters([
//         'permission_routers',
//         'sidebar'
//       ]),
//       menuTheme() {
//         return this.$store.state.app.menuTheme;
//       },
//       openedSubmenuArr() {
//         let n = this.$route.path.split("/")[1];
//         return [n];
//       },
//       iconColor() {
//         return this.$store.state.app.menuTheme === 'dark' ? 'white' : '#495060';
//       },
//     },
//     methods: {
//       changeMenu(active) {
//         this.$router.push(active);
//       },
//       changeNavMenu(url) {
//         this.menu = url;
//       },
//       herfchange() {
//         let path = "/";
//         this.$router.push(path);
//         this.menu = path;
//       },
//     },
//   }
// </script>

// <style lang="less">
//   .leftTitle {
//     color: #fff;
//   }
//   .shrink {
//     text-align: center;
//     .shrinkbutton {
//       width: 65px;
//       padding: 10px 0;
//     }
//     .shrinkdropdownMenu {
//       width: 200px;
//     }
//     .dropdownItemIcon {
//       padding-left: 10px;
//     }
//   }
// </style> -->

