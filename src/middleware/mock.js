/**
 * 本地接口mock
 */
module.exports = function(app) {
  const isMock = process.env.MOCK_ENV === 'mock'
  if (isMock) {
    console.log('  ✈️   mocking now ! \n')

    // 用户侧边栏权限获取接口
    app.get('/xq/report/auth/query.json', (req, res) => {
      res.json({
        result_data: [
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
            resource_type: ''
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
            resource_type: ''
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
            resource_type: ''
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
            resource_type: ''
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
            resource_type: ''
          },
          {
            resource_id: 6,
            resource_pid: 0,
            name: '数据导入',
            path: '',
            location: '/import',
            icon: 'chart-line',
            locked: false,
            create_time: 1523257401487,
            update_time: 1523257401487,
            resource_type: ''
          }
        ],
        msg: null,
        result_code: '60000',
        success: true
      })
    })
  }
}
