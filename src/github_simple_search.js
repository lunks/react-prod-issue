import React, { useState, useEffect } from 'react'
import useRepositorySearch from './use_repository_search'

const GithubSimpleSearch = () => {
  const { inputText, setInputText, search } = useRepositorySearch()

  return (
    <>
    <div>
      <input type="text" value={inputText} onChange={e => setInputText(e.target.value)} />
    </div>
    <div>
      <div>
        {search.loading && <div>...</div>}
        {search.error && <div>Error: {search.error.message}</div>}
        {search.result && (
          <div>
            <div>Results: {search.result.length}</div>
            <ul>
              {search.result.map((repository) => {
                const path = `${repository.owner}/${repository.name}`
                const link = "https://github.com/" + path

                return <li key={path}><a href={link}>{path}</a></li>;
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
    </>
  )
}

export default GithubSimpleSearch
