import * as React from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter } from 'react-router-dom'
import { Image, Container, Menu, Divider, Grid, Form, Table, Checkbox, Button, Icon, Sidebar, Segment, Header, Responsive, MenuItemProps, Popup, Dropdown } from 'semantic-ui-react';

import * as auth from '../common/auth';

import HomeHeader from "../home/header";
import HomeContent from "../home/content";
import ProfileHeader from "../profile/header";
import ProfileContent from "../profile/content";

export interface IMasterLayoutProps {
    collapsed?: boolean;
    toggle: () => void;
    username?: string;
    children?: React.ReactNode | React.ReactNode[];
}

export const MasterLayoutMenu = (props: {} | { children?: React.ReactNode }) => (props as any).children;
export const MasterLayoutHeader = (props: {} | { children?: React.ReactNode }) => (props as any).children;
export const MasterLayoutContent = (props: {} | { children?: React.ReactNode }) => (props as any).children;

export default (props: IMasterLayoutProps) => {
    const elements: React.ReactNode[] = typeof(props.children) === 'undefined' ? [] : Array.isArray(props.children) ? props.children : [props.children];
    const menuElements = elements.filter((e: React.ReactElement<any>) => e.type === MasterLayoutMenu);
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
                    <Menu.Item>
                        <Menu.Header><span className='mbb-menu-header1' onClick={() => location.href = '/'}>Module 1</span><span className='mbb-menu-header2' onClick={() => location.href = '/'}>#1</span></Menu.Header>
                        {menuElements}
                    </Menu.Item>
                    <Menu.Item>
                        <Menu.Header><span className='mbb-menu-header1' onClick={() => location.href = '/'}>Module 2</span><span className='mbb-menu-header2' onClick={() => location.href = '/'}>#2</span></Menu.Header>
                        <Menu.Menu>
                            <Menu.Item link onClick={() => location.href = 'http://localhost:3001/bin/dev/item1'}><span className='mbb-menu-item1'><Icon name='weibo'/>Item 1</span><span className='mbb-menu-item2'><Popup trigger={<Icon name='weibo'/>} content='Item1' position='right center' inverted/></span></Menu.Item>
                            <Menu.Item link onClick={() => location.href = 'http://localhost:3001/bin/dev/item2'}><span className='mbb-menu-item1'><Icon name='whatsapp'/>Item 2</span><span className='mbb-menu-item2'><Popup trigger={<Icon name='whatsapp'/>} content='Item2' position='right center' inverted/></span></Menu.Item>
                        </Menu.Menu>
                    </Menu.Item>
                    <Menu.Item>
                        <Menu.Header><span className='mbb-menu-header1' onClick={() => location.href = '/'}>Module 3</span><span className='mbb-menu-header2' onClick={() => location.href = '/'}>#3</span></Menu.Header>
                    </Menu.Item>
                    <Menu.Item>
                        <Menu.Header><span className='mbb-menu-header1' onClick={() => location.href = '/'}>Module 4</span><span className='mbb-menu-header2' onClick={() => location.href = '/'}>#4</span></Menu.Header>
                    </Menu.Item>
                    <Menu.Item>
                        <Menu.Header><span className='mbb-menu-header1' onClick={() => location.href = '/'}>Module 5</span><span className='mbb-menu-header2' onClick={() => location.href = '/'}>#5</span></Menu.Header>
                    </Menu.Item>
                    <Menu.Item>
                        <Menu.Header><span className='mbb-menu-header1' onClick={() => location.href = '/'}>Module 6</span><span className='mbb-menu-header2' onClick={() => location.href = '/'}>#6</span></Menu.Header>
                    </Menu.Item>
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