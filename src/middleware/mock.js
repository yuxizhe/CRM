/**
 * 本地接口mock
 */
module.exports = function mock(app) {
  const isMock = process.env.MOCK_ENV === 'mock';
  if (isMock) {
    console.log('  ✈️   mocking now ! \n');

    // 用户侧边栏权限获取接口
    app.get('/xq/report/auth/query.json', (req, res) => {
      res.json({
        data: [
          {
            resource_id: 1,
            resource_pid: 0,
            name: '权限管理',
            path: '/internal/snowx/report/permission/.*',
            location: '',
            icon: 'team',
            locked: true,
            create_time: 1522754186000,
            update_time: 1523257425826,
            resource_type: '',
          },
          {
            resource_id: 2,
            resource_pid: 1,
            name: '用户管理',
            path: '',
            location: '/user-manage',
            icon: 'user-add',
            locked: false,
            create_time: 1522754186000,
            update_time: 1522754186000,
            resource_type: '',
          },
          {
            resource_id: 3,
            resource_pid: 1,
            name: '角色管理',
            path: '',
            location: '/role-manage',
            icon: 'usergroup-add',
            locked: false,
            create_time: 1522754186000,
            update_time: 1523257496999,
            resource_type: '',
          },
          {
            resource_id: 4,
            resource_pid: 1,
            name: '资源管理',
            path: '',
            location: '/resource-manage',
            icon: 'folder-add',
            locked: false,
            create_time: 1522754186000,
            update_time: 1523257506011,
            resource_type: '',
          },
          {
            resource_id: 5,
            resource_pid: 0,
            name: '测试页面',
            path: '',
            location: '/example',
            icon: 'appstore',
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: '',
          },
          {
            resource_id: 51,
            resource_pid: 5,
            name: '列表查询页',
            path: '',
            location: '/example/list',
            icon: 'bars',
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: '',
          },
          {
            resource_id: 52,
            resource_pid: 5,
            name: '信息展示页',
            path: '',
            location: '/example/info',
            icon: 'file-ppt',
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: '',
          },
          {
            resource_id: 53,
            resource_pid: 5,
            name: '图表页',
            path: '',
            location: '/example/chart',
            icon: 'line-chart',
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: '',
          },
          {
            resource_id: 54,
            resource_pid: 5,
            name: 'Dashboard',
            path: '',
            location: '/example/dashboard',
            icon: 'dashboard',
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: '',
          },
          {
            resource_id: 55,
            resource_pid: 5,
            name: '信息输入弹窗',
            path: '',
            location: '/example/modal',
            icon: 'form',
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: '',
          },
          {
            resource_id: 6,
            resource_pid: 0,
            name: 'Snowfire',
            path: '',
            location: '/snowfire',
            icon: 'appstore',
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: '',
          },
        ],
        error_description: null,
        error_code: 0,
        success: true,
      });
    });

    // 用户登录接口
    app.post('/xq/report/auth/login.json', (req, res) => {
      const token = `${req.body.username}-${req.body.password}`;
      res.json({
        data: {
          xq_crm_token: token,
        },
        error_description: null,
        error_code: 0,
        success: true,
      });
    });

    // 用户查询接口
    app.get('/xq/report/permission/user/get/all.json', (req, res) => {
      res.json({
        data: [
          {
            user_id: 1,
            name: 'aaa',
            create_time: 1522754186000,
            update_time: 1522754186000,
            roles: [
              {
                role_id: 1,
                name: 'admin',
                create_time: 1522754186000,
                update_time: 1522754186000,
                resources: null,
              },
              {
                role_id: 2,
                name: '运营',
                create_time: 1524028250463,
                update_time: 1524028250463,
                resources: null,
              },
            ],
          },
          {
            user_id: 2,
            name: 'bbb',
            create_time: 1522754186000,
            update_time: 1522754186000,
            roles: [
              {
                role_id: 1,
                name: 'admin',
                create_time: 1522754186000,
                update_time: 1522754186000,
                resources: null,
              },
            ],
          },
          {
            user_id: 3,
            name: 'ccc',
            create_time: 1522754186000,
            update_time: 1522754186000,
            roles: [
              {
                role_id: 1,
                name: 'admin',
                create_time: 1522754186000,
                update_time: 1522754186000,
                resources: null,
              },
            ],
          },
        ],
        error_description: null,
        error_code: 0,
        success: true,
      });
    });

    // 权限分类接口
    app.get('/xq/report/permission/role/get/all.json', (req, res) => {
      res.json({
        data: [
          {
            role_id: 1,
            name: 'admin',
            create_time: 1522754186000,
            update_time: 1522754186000,
            resources: null,
          },
          {
            role_id: 2,
            name: '运营',
            create_time: 1524028250463,
            update_time: 1524028250463,
            resources: null,
          },
          {
            role_id: 3,
            name: '客服',
            create_time: 1527059218231,
            update_time: 1527059218231,
            resources: null,
          },
        ],
        error_description: null,
        error_code: 0,
        success: true,
      });
    });

    // 用户角色查询接口
    app.get('/xq/report/permission/role/get/all.json', (req, res) => {
      res.json({
        data: [
          {
            role_id: 1,
            name: 'admin',
            create_time: 1522754186000,
            update_time: 1522754186000,
            resources: null,
          },
          {
            role_id: 2,
            name: '运营',
            create_time: 1524028250463,
            update_time: 1524028250463,
            resources: null,
          },
          {
            role_id: 3,
            name: '客服',
            create_time: 1527059218231,
            update_time: 1527059218231,
            resources: null,
          },
          {
            role_id: 4,
            name: '消息推送者',
            create_time: 1534766600670,
            update_time: 1534766600670,
            resources: null,
          },
          {
            role_id: 7,
            name: '测试',
            create_time: 1542258805745,
            update_time: 1542258805745,
            resources: null,
          },
          {
            role_id: 8,
            name: '境外卡办理',
            create_time: 1542959222507,
            update_time: 1542959222507,
            resources: null,
          },
          {
            role_id: 9,
            name: '开发',
            create_time: 1543287488559,
            update_time: 1543287488559,
            resources: null,
          },
        ],
        error_description: null,
        error_code: 0,
        success: true,
      });
    });

    // 获取角色权限
    app.get('/xq/report/permission/role/get/resources.json', (req, res) => {
      res.json({
        data: [
          {
            resource_id: 1,
            resource_pid: 0,
            name: '权限管理',
            path: '/internal/snowx/report/permission/.*',
            location: '',
            icon: 'cog',
            locked: true,
            create_time: 1522754186000,
            update_time: 1523257425826,
            resource_type: '',
          },
          {
            resource_id: 2,
            resource_pid: 1,
            name: '用户管理',
            path: '',
            location: '/user-manage',
            icon: '',
            locked: false,
            create_time: 1522754186000,
            update_time: 1522754186000,
            resource_type: '',
          },
          {
            resource_id: 3,
            resource_pid: 1,
            name: '角色管理',
            path: '',
            location: '/role-manage',
            icon: '',
            locked: false,
            create_time: 1522754186000,
            update_time: 1523257496999,
            resource_type: '',
          },
          {
            resource_id: 4,
            resource_pid: 1,
            name: '资源管理',
            path: '',
            location: '/resource-manage',
            icon: '',
            locked: false,
            create_time: 1522754186000,
            update_time: 1523257506011,
            resource_type: '',
          },
          {
            resource_id: 5,
            resource_pid: 0,
            name: '概览',
            path: '',
            location: '/',
            icon: 'tachometer-alt',
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: '',
          },
        ],
        error_description: null,
        error_code: 0,
        success: true,
      });
    });

    // 获取所有模块
    app.get('/xq/report/permission/resource/get/all.json', (req, res) => {
      res.json({
        data: [
          {
            resource_id: 1,
            resource_pid: 0,
            name: '权限管理',
            path: '/internal/snowx/report/permission/.*',
            location: '',
            icon: 'cog',
            locked: true,
            create_time: 1522754186000,
            update_time: 1523257425826,
            resource_type: '',
          },
          {
            resource_id: 2,
            resource_pid: 1,
            name: '用户管理',
            path: '',
            location: '/user-manage',
            icon: '',
            locked: false,
            create_time: 1522754186000,
            update_time: 1522754186000,
            resource_type: '',
          },
          {
            resource_id: 3,
            resource_pid: 1,
            name: '角色管理',
            path: '',
            location: '/role-manage',
            icon: '',
            locked: false,
            create_time: 1522754186000,
            update_time: 1523257496999,
            resource_type: '',
          },
          {
            resource_id: 4,
            resource_pid: 1,
            name: '资源管理',
            path: '',
            location: '/resource-manage',
            icon: '',
            locked: false,
            create_time: 1522754186000,
            update_time: 1523257506011,
            resource_type: '',
          },
          {
            resource_id: 5,
            resource_pid: 0,
            name: '概览',
            path: '',
            location: '/',
            icon: 'tachometer-alt',
            locked: false,
            create_time: 1523257349592,
            update_time: 1539595755019,
            resource_type: '',
          },
        ],
        error_description: null,
        error_code: 0,
        success: true,
      });
    });

    // 剩余接口统一返回成功
    app.all('/xq/report/*', (req, res) => {
      res.json({
        data: '',
        error_description: null,
        error_code: 0,
        success: true,
      });
    });
  }
};
