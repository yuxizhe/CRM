/**
 * 本地接口mock
 */
const Router = require('koa-router');

const router = new Router();
const resjson = (ctx, data) => {
  ctx.type = 'application/json';
  ctx.body = data;
};

module.exports = (app) => {
  const isMock = process.env.MOCK_ENV === 'mock';
  if (isMock) {
    console.log('  ✈️   mocking now ! \n');

    // 用户侧边栏权限获取接口
    router.get('/xq/report/auth/query.json', (ctx) => {
      resjson(ctx, {
        data: [{
          resource_id: 1,
          resource_pid: 0,
          name: '数据配置',
          path: '',
          location: '/datadock/step1',
          icon: 'form',
          locked: false,
          create_time: 1523257349592,
          update_time: 1539595755019,
          resource_type: '',
        },
        {
          resource_id: 11,
          resource_pid: 1,
          name: '信息录入页',
          path: '',
          location: '/datadock/step1/infoEntry',
          icon: 'bars',
          locked: false,
          create_time: 1523257349592,
          update_time: 1539595755019,
          resource_type: '',
        },
        {
          resource_id: 12,
          resource_pid: 1,
          name: '配置页',
          path: '',
          location: '/datadock/step1/configPage',
          icon: 'bars',
          locked: false,
          create_time: 1523257349592,
          update_time: 1539595755019,
          resource_type: '',
        },
        {
          resource_id: 13,
          resource_pid: 1,
          name: 'DestColumns页',
          path: '',
          location: '/datadock/step1/destColumns',
          icon: 'bars',
          locked: false,
          create_time: 1523257349592,
          update_time: 1539595755019,
          resource_type: '',
        },
        {
          resource_id: 14,
          resource_pid: 1,
          name: 'TimeColumn页',
          path: '',
          location: '/datadock/step1/timeColumn',
          icon: 'bars',
          locked: false,
          create_time: 1523257349592,
          update_time: 1539595755019,
          resource_type: '',
        },
        {
          resource_id: 15,
          resource_pid: 1,
          name: '继续填写',
          path: '',
          location: '/datadock/step1/moreInfo',
          icon: 'bars',
          locked: false,
          create_time: 1523257349592,
          update_time: 1539595755019,
          resource_type: '',
        },
        {
          resource_id: 16,
          resource_pid: 1,
          name: '汇总页',
          path: '',
          location: '/datadock/step1/summary',
          icon: 'bars',
          locked: false,
          create_time: 1523257349592,
          update_time: 1539595755019,
          resource_type: '',
        },
        {
          resource_id: 2,
          resource_pid: 0,
          name: 'job启动',
          path: '',
          location: '/datadock/step2',
          icon: 'eye',
          locked: false,
          create_time: 1523257349592,
          update_time: 1539595755019,
          resource_type: '',
        },
        {
          resource_id: 3,
          resource_pid: 0,
          name: '报警',
          path: '',
          location: '/datadock/step3',
          icon: 'warning',
          locked: false,
          create_time: 1523257349592,
          update_time: 1539595755019,
          resource_type: '',
        },
        ],
        error_description: null,
        error_code: 100000,
        success: true,
      });
    });

    // 用户登录接口
    router.post('/xq/report/auth/login.json', (ctx) => {
      const token = `${ctx.request.body.username}-${ctx.request.body.password}`;
      resjson(ctx, {
        data: {
          xq_crm_token: token,
        },
        error_description: null,
        error_code: 100000,
        success: true,
      });
    });


    // 获取所有模块
    router.get('/xq/report/permission/resource/get/all.json', (ctx) => {
      resjson(ctx, {
        data: [{
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
        error_code: 100000,
        success: true,
      });
    });

    // 剩余接口统一返回成功
    router.all('/xq/report/*', (ctx) => {
      resjson(ctx, {
        data: '',
        error_description: null,
        error_code: 100000,
        success: true,
      });
    });

    // datadock的模拟接口
    router.all('/xq/datadock', (ctx) => {
      resjson(ctx, {
        debug: null,
        data: [{
          key: '2018-12-27 10:33:54.427',
          value: {
            userid: 3093851759,
            statusid: 118733430,
            timestamp: 1545645422000,
          },
        },
        {
          key: '',
          value: {},
        },
        ],
        error_code: 100000,
        error_description: '',
      });
    });

    app.use(router.routes());
  }
};
