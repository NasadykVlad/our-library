import React from 'react'

// eslint-disable-next-line
export default () => <div style={{display: 'flex', justifyContent: 'center', position: 'fixed', top: '50%', left: '50%', right: '50%', bottom: '50%'}}>
    <div className={window.location.href.indexOf('filecloud') === 22 ? 'lds-ring lds-ring-white' : 'lds-ring'}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
