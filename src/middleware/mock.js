/**
 * 本地接口mock
 */
module.exports = function(app) {
  const isMock = process.env.MOCK_ENV === "mock";
  if (isMock) {
    console.log("  ✈️   mocking now ! \n");

    // 用户侧边栏权限获取接口
    app.get("/xq/report/auth/query.json", (req, res) => {
      res.json({
        result_data: [
          {
            resource_id: 1,
            resource_pid: 0,
            name: "权限管理",
            path: "/internal/snowx/report/permission/.*",
            location: "",
            icon: "cog",
            locked: true,
            create_time: 1522754186000,
            update_time: 1523257425826,
            resource_type: ""
          },
          {
            resource_id: 2,
            resource_pid: 1,
            name: "用户管理",
            path: "",
            location: "/user-manage",
            icon: "",
            locked: false,
            create_time: 1522754186000,
            update_time: 1522754186000,
            resource_type: ""
          },
          {
            resource_id: 3,
            resource_pid: 1,
            name: "角色管理",
            path: "",
            location: "/role-manage",
            icon: "",
            locked: false,
            create_time: 1522754186000,
            update_time: 1523257496999,
            resource_type: ""
          },
          {
            resource_id: 4,
            resource_pid: 1,
            name: "资源管理",
            path: "",
            location: "/resource-manage",
            icon: "",
            locked: false,
            create_time: 1522754186000,
            update_time: 1523257506011,
            resource_type: ""
          },
          {
            resource_id: 5,
            resource_pid: 0,
            name: "测试页面",
            path: "",
            location: "/example",
            icon: "tachometer-alt",
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: ""
          },
          {
            resource_id: 6,
            resource_pid: 0,
            name: "数据导入",
            path: "",
            location: "/import",
            icon: "chart-line",
            locked: false,
            create_time: 1523257401487,
            update_time: 1523257401487,
            resource_type: ""
          }
        ],
        msg: null,
        result_code: "60000",
        success: true
      });
    });

    // 用户登录接口
    app.post("/xq/report/auth/login.json", (req, res) => {
      const token = `${req.body.username}-${req.body.password}`;
      res.json({
        result_data: {
          xq_crm_token: token
        },
        msg: null,
        result_code: "60000",
        success: true
      });
    });

    // 用户查询接口
    app.get("/xq/report/permission/user/get/all.json", (req, res) => {
      res.json({
        result_data: [
          {
            user_id: 1,
            name: "aaa",
            create_time: 1522754186000,
            update_time: 1522754186000,
            roles: [
              {
                role_id: 1,
                name: "admin",
                create_time: 1522754186000,
                update_time: 1522754186000,
                resources: null
              },
              {
                role_id: 2,
                name: "运营",
                create_time: 1524028250463,
                update_time: 1524028250463,
                resources: null
              }
            ]
          },
          {
            user_id: 2,
            name: "bbb",
            create_time: 1522754186000,
            update_time: 1522754186000,
            roles: [
              {
                role_id: 1,
                name: "admin",
                create_time: 1522754186000,
                update_time: 1522754186000,
                resources: null
              }
            ]
          },
          {
            user_id: 3,
            name: "ccc",
            create_time: 1522754186000,
            update_time: 1522754186000,
            roles: [
              {
                role_id: 1,
                name: "admin",
                create_time: 1522754186000,
                update_time: 1522754186000,
                resources: null
              }
            ]
          }
        ],
        msg: null,
        result_code: "60000",
        success: true
      });
    });

    // 权限分类接口
    app.get("/xq/report/permission/role/get/all.json", (req, res) => {
      res.json({
        result_data: [
          {
            role_id: 1,
            name: "admin",
            create_time: 1522754186000,
            update_time: 1522754186000,
            resources: null
          },
          {
            role_id: 2,
            name: "运营",
            create_time: 1524028250463,
            update_time: 1524028250463,
            resources: null
          },
          {
            role_id: 3,
            name: "客服",
            create_time: 1527059218231,
            update_time: 1527059218231,
            resources: null
          }
        ],
        msg: null,
        result_code: "60000",
        success: true
      });
    });

    // 用户角色查询接口
    app.get("/xq/report/permission/role/get/all.json", (req, res) => {
      res.json({
        result_data: [
          {
            role_id: 1,
            name: "admin",
            create_time: 1522754186000,
            update_time: 1522754186000,
            resources: null
          },
          {
            role_id: 2,
            name: "运营",
            create_time: 1524028250463,
            update_time: 1524028250463,
            resources: null
          },
          {
            role_id: 3,
            name: "客服",
            create_time: 1527059218231,
            update_time: 1527059218231,
            resources: null
          },
          {
            role_id: 4,
            name: "消息推送者",
            create_time: 1534766600670,
            update_time: 1534766600670,
            resources: null
          },
          {
            role_id: 7,
            name: "测试",
            create_time: 1542258805745,
            update_time: 1542258805745,
            resources: null
          },
          {
            role_id: 8,
            name: "境外卡办理",
            create_time: 1542959222507,
            update_time: 1542959222507,
            resources: null
          },
          {
            role_id: 9,
            name: "开发",
            create_time: 1543287488559,
            update_time: 1543287488559,
            resources: null
          }
        ],
        msg: null,
        result_code: "60000",
        success: true
      });
    });

    // 获取角色权限
    app.get("/xq/report/permission/role/get/resources.json", (req, res) => {
      res.json({
        result_data: [
          {
            resource_id: 1,
            resource_pid: 0,
            name: "权限管理",
            path: "/internal/snowx/report/permission/.*",
            location: "",
            icon: "cog",
            locked: true,
            create_time: 1522754186000,
            update_time: 1523257425826,
            resource_type: ""
          },
          {
            resource_id: 2,
            resource_pid: 1,
            name: "用户管理",
            path: "",
            location: "/user-manage",
            icon: "",
            locked: false,
            create_time: 1522754186000,
            update_time: 1522754186000,
            resource_type: ""
          },
          {
            resource_id: 3,
            resource_pid: 1,
            name: "角色管理",
            path: "",
            location: "/role-manage",
            icon: "",
            locked: false,
            create_time: 1522754186000,
            update_time: 1523257496999,
            resource_type: ""
          },
          {
            resource_id: 4,
            resource_pid: 1,
            name: "资源管理",
            path: "",
            location: "/resource-manage",
            icon: "",
            locked: false,
            create_time: 1522754186000,
            update_time: 1523257506011,
            resource_type: ""
          },
          {
            resource_id: 5,
            resource_pid: 0,
            name: "概览",
            path: "",
            location: "/",
            icon: "tachometer-alt",
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: ""
          }
        ],
        msg: null,
        result_code: "60000",
        success: true
      });
    });

    // 获取所有模块
    app.get("/xq/report/permission/resource/get/all.json", (req, res) => {
      res.json({
        result_data: [
          {
            resource_id: 1,
            resource_pid: 0,
            name: "权限管理",
            path: "/internal/snowx/report/permission/.*",
            location: "",
            icon: "cog",
            locked: true,
            create_time: 1522754186000,
            update_time: 1523257425826,
            resource_type: ""
          },
          {
            resource_id: 2,
            resource_pid: 1,
            name: "用户管理",
            path: "",
            location: "/user-manage",
            icon: "",
            locked: false,
            create_time: 1522754186000,
            update_time: 1522754186000,
            resource_type: ""
          },
          {
            resource_id: 3,
            resource_pid: 1,
            name: "角色管理",
            path: "",
            location: "/role-manage",
            icon: "",
            locked: false,
            create_time: 1522754186000,
            update_time: 1523257496999,
            resource_type: ""
          },
          {
            resource_id: 4,
            resource_pid: 1,
            name: "资源管理",
            path: "",
            location: "/resource-manage",
            icon: "",
            locked: false,
            create_time: 1522754186000,
            update_time: 1523257506011,
            resource_type: ""
          },
          {
            resource_id: 5,
            resource_pid: 0,
            name: "概览",
            path: "",
            location: "/",
            icon: "tachometer-alt",
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: ""
          }
        ],
        msg: null,
        result_code: "60000",
        success: true
      });
    });

    // 剩余接口统一返回成功
    app.all("/xq/*", (req, res) => {
      res.json({
        result_data: "",
        msg: null,
        result_code: "60000",
        success: true
      });
    });
  }
};
