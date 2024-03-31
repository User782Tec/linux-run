import React from 'react';
import './Button.scss';
import PropTypes from 'prop-types';
Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func,
    type: PropTypes.string
};

/**
 * @typedef Props
 * @property {string} [type] 按钮类型 (`normal` 普通风格; `submit` 积极(确定)风格; `cancel` 消极(取消)风格)，默认为 `normal`
 * @property {function} [onClick] 当按钮被点击时调用的函数
 * @property {Node} [children] 按钮内的元素或文本
 */

/**
 * 现代风格的按钮
 * @param {Props} props
 */
function Button({ children = <></>, type = 'normal', onClick = () => {} }) {
    return (
        <div className={`button${type == 'normal' ? ' normal' : ''}${type == 'submit' ? ' submit' : ''}${type == 'cancel' ? ' cancel' : ''}`} onClick={onClick}>
            {children}
        </div>
    );
}

export default Button;
