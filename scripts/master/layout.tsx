import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter } from 'react-router-dom'
import { Image, Container, Menu, Divider, Grid, Form, Table, Checkbox, Button, Icon, Sidebar, Segment, Header, Responsive, MenuItemProps, Popup, Dropdown, Item } from 'semantic-ui-react';

import * as auth from '../common/auth';

import HomeHeader from "../home/header";
import HomeContent from "../home/content";
import ProfileHeader from "../profile/header";
import ProfileContent from "../profile/content";
import { META } from '../common/meta';

export interface IMasterLayoutProps {
    collapsed?: boolean;
    toggle: () => void;
    username?: string;
    children?: React.ReactNode | React.ReactNode[];
}

export const MasterLayoutNavbar = (props: {} | { children?: React.ReactNode }) => (props as any).children;
export const MasterLayoutHeader = (props: {} | { children?: React.ReactNode }) => (props as any).children;
export const MasterLayoutContent = (props: {} | { children?: React.ReactNode }) => (props as any).children;

export default (props: IMasterLayoutProps) => {
    const elements: React.ReactNode[] = typeof(props.children) === 'undefined' ? [] : Array.isArray(props.children) ? props.children : [props.children];
    const navbarElements = elements.filter((e: React.ReactElement<any>) => e.type === MasterLayoutNavbar);
    const headerElements = elements.filter((e: React.ReactElement<any>) => e.type === MasterLayoutHeader);
    const contentElements = elements.filter((e: React.ReactElement<any>) => e.type === MasterLayoutContent);

    return <div className={(typeof(props.collapsed) === 'undefined' || props.collapsed === null || !props.collapsed) ? 'mbb-menu-expand' : 'mbb-menu-collapse'}>
        <header className='mbb-table mbb-header'>
            {!!props.username && <div className='mbb-cell mbb-brand'>
                <div className='mbb-table'>
                    <div className='mbb-cell mbb-logo'><NavLink to='/'><span className='mbb-text'>MicroApp<sup>&reg;</sup></span></NavLink></div>
                    <div className='mbb-cell mbb-toggle'><a className='mbb-toggler' onClick={props.toggle}><i className='big sidebar icon'></i><i className='big unordered list icon'></i><i className='remove big icon'></i></a></div>
                </div>
            </div>}
            <div className='mbb-cell mbb-toolbar'>
                <Menu size='huge' secondary>
                    <Menu.Item>
                        {!props.username && (<span>MicroApp<sup>&reg;</sup> PoC</span>)}
                        {!!props.username && (<Route path='/' exact component={HomeHeader} />)}
                        {!!props.username && (<Route path='/profile' component={ProfileHeader} />)}
                        {!!props.username && (headerElements)}
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Dropdown item trigger={!!props.username ? (<span> <Icon name='user'/>Hi, {props.username}</span>) : (<span><Icon size='large' name='user circle'/>Login</span>)}>
                            {!!props.username ?
                            (<Dropdown.Menu>
                                <Dropdown.Item as={NavLink} to='/profile'><Icon name='id card outline'/>Profile</Dropdown.Item>
                                <Divider/>
                                <Dropdown.Item onClick={(e, d) => auth.logout().then(loggedout => loggedout ? location.reload() : alert('Failed to logout')).catch(alert)}><Icon name='sign out'/>Logout</Dropdown.Item>
                            </Dropdown.Menu>) :
                            (<Dropdown.Menu>
                                <Dropdown.Item onClick={(e, d) => auth.login().then(loggedin => loggedin ? location.reload() : alert('Failed to login')).catch(alert)}><Icon name='sign in'/>Login</Dropdown.Item>
                            </Dropdown.Menu>)}
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
            </div>
        </header>
        <div className='mbb-body'>
            {!!props.username && <div className='mbb-menu'>
                <Menu size='massive' inverted secondary vertical fluid>
                {Object.getOwnPropertyNames(META().modules).map(moduleCode => (
                    <Menu.Item key={moduleCode}>
                        <Menu.Header><span className='mbb-menu-header1' onClick={() => location.href = META().modules[moduleCode].url}>{META().modules[moduleCode].name}</span><span className='mbb-menu-header2' onClick={() => location.href = META().modules[moduleCode].url}>{META().modules[moduleCode].name}</span></Menu.Header>
                        {moduleCode === META().current && navbarElements}
                        {moduleCode !== META().current && <Menu.Menu>
                            {Object.getOwnPropertyNames(META().modules[moduleCode].items).map(itemCode => (
                                <Menu.Item key={itemCode} link href={META().modules[moduleCode].url + META().modules[moduleCode].items[itemCode].path}><span className='mbb-menu-item1'><Icon name='weibo'/>{META().modules[moduleCode].items[itemCode].name}</span><span className='mbb-menu-item2'><Popup trigger={<Icon name='weibo'/>} content={META().modules[moduleCode].items[itemCode].name} position='right center' inverted/></span></Menu.Item>
                            ))}
                        </Menu.Menu>}
                    </Menu.Item>
                ))}
                </Menu>
            </div>}
            {!!props.username && <div className='mbb-content'>
                <Route exact path='/' component={HomeContent} />
                <Route path='/profile' component={ProfileContent} />
                {contentElements}
            </div>}
            {!props.username && <div className='mbb-content'>
                <Route exact path='/' component={HomeContent} />
            </div>}
        </div>
    </div>
};