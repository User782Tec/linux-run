import React from 'react';
import './Input.scss';
import PropTypes from 'prop-types';
Input.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    before: PropTypes.node,
    beforeWidth: PropTypes.number,
    type: PropTypes.string,
    width: PropTypes.string,
    style: PropTypes.object
};

/**
 * @typedef {object} Props
 * @property {string} [type] 输入框的类型，默认为 `text`
 * @property {string} [placeholder] 输入框的占位文本
 * @property {string} [value] 输入框的默认值
 * @property {boolean} [disabled] 输入框是否被禁用，默认为 `false`
 * @property {boolean} [readonly] 输入框是否为只读状态，默认为 `false`
 * @property {Node} [before] 输入框前的元素，如搜索图标，会被嵌入到输入框中显示
 * @property {number} [beforeWidth] 输入框前的元素的宽度
 * @property {string} [width] 输入框的宽度
 * @property {object} [style] 输入框的自定义样式
 */

/**
 * 现代风格的输入框
 * @param {Props} props
 */
function Input({ type = 'text', placeholder = '', value = '', disabled = false, readonly = false, before = null, beforeWidth = 0, width = '', style = {}, ...props }) {
    return (
        <div className="input-container">
            <div className="input-before">{before}</div>
            <input {...props} type={type} style={{ paddingLeft: beforeWidth + 10, width: width, ...style }} className="input" placeholder={placeholder} defaultValue={value} disabled={disabled} readOnly={readonly}></input>
        </div>
    );
}

export default Input;
