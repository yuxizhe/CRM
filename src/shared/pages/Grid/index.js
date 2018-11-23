import React, { Component } from 'react'
import './style.less'
class Grid extends Component {
  constructor(props) {
    super(props)

    let repos
    if (__isBrowser__) {
      repos = window.__INITIAL_DATA__
      delete window.__INITIAL_DATA__
    } else {
      repos = this.props.staticContext.data
    }

    this.state = {
      repos,
      loading: repos ? false : true
    }

    this.fetchRepos = this.fetchRepos.bind(this)
  }
  componentDidMount() {
    if (!this.state.repos) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchRepos(this.props.match.params.id)
    }
  }
  fetchRepos(lang) {
    this.setState(() => ({
      loading: true
    }))

    this.props.fetchInitialData(lang).then(repos =>
      this.setState(() => ({
        repos,
        loading: false
      }))
    )
  }
  render() {
    const { loading, repos } = this.state

    if (loading === true) {
      return <p>LOADING</p>
    }

    return (
      <ul className="line">
        {repos.data.map(({ user_infos, title, content_time, content_url }) => (
          <li key={content_url} style={{ margin: 30 }}>
            <ul>
              <li>
                <a className="name" href={content_url}>
                  {title}
                </a>
              </li>
              <li>@{user_infos[0].user_nick_name}</li>
              <li>{content_time} stars</li>
            </ul>
          </li>
        ))}
      </ul>
    )
  }
}

export default Grid
