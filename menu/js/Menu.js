'use strict';
function Menu(props){
    console.log('props', props);
    let menuClass = props.opened ? 'menu menu-open' : 'menu';
    return <div className={menuClass}>
        <div className="menu-toggle"><span></span></div>
        {getNav(props)}
    </div>
}

function getNav(props){
    if(!props.opened){
        return '';
    }
    let items = props.items.map(item => {
        return (<li><a href={item.href}>{item.title}</a></li>)
    });
    return (
        <nav>
            <ul>
                {items}
            </ul>
        </nav>
    )
}