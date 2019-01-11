/**
 * 本地接口mock
 */
module.exports = function (app) {
  const isMock = process.env.MOCK_ENV === "mock";
  if (isMock) {
    console.log("  ✈️   mocking now ! \n");

    // 用户侧边栏权限获取接口
    app.get("/xq/report/auth/query.json", (req, res) => {
      res.json({
        data: [
          {
            resource_id: 1,
            resource_pid: 0,
            name: "数据接入",
            path: "",
            location: "/datadock/step1",
            icon: "form",
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: ""
          }
        ],
        error_description: null,
        error_code: 100000,
        success: true
      });
    });

    // 用户登录接口
    app.post("/xq/report/auth/login.json", (req, res) => {
      const token = `${req.body.username}-${req.body.password}`;
      res.json({
        data: {
          xq_crm_token: token
        },
        error_description: null,
        error_code: 100000,
        success: true
      });
    });

    

    // 获取所有模块
    app.get("/xq/report/permission/resource/get/all.json", (req, res) => {
      res.json({
        data: [
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
        error_description: null,
        error_code: 100000,
        success: true
      });
    });

    // 剩余接口统一返回成功
    app.all("/xq/report/*", (req, res) => {
      res.json({
        data: "",
        error_description: null,
        error_code: 100000,
        success: true
      });
    });

    // datadock的模拟接口
    app.all("/xq/datadock", (req, res) => {
      res.json({
        "debug": null,
        "data": [
            {
                "key": "2018-12-27 10:33:54.427",
                "value": {
                    "userid": 3093851759,
                    "statusid": 118733430,
                    "timestamp": 1545645422000
                }
            },
            {
                "key": "",
                "value": {}
            }
        ],
        "error_code": 100000,
        "error_description": ""
    });
    });
  }
};
