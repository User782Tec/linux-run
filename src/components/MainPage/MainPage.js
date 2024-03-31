import React, { useEffect, useRef } from "react";
import Input from "../Input/Input.js";
import Button from "../Button/Button.js";
import logo from '../../assets/logo.png';
import "./MainPage.scss";

function MainPage() {
    const ref = useRef();
    useEffect(() => {
        ref.current.querySelector("input").focus();
    });
    return (
        <div className="mainPage">
            <div className="contents">
                <div className="left">
                    <img style={{ pointerEvents: null }} src={logo} />
                </div>
                <div className="right">
                    <div>Linux 将根据你所输入的名称，为你打开相应的程序、文件夹、文档或 Internet 资源</div>
                </div>
            </div>

            <div className="container">
                <div className="input" ref={ref} spellCheck={false}>
                    <Input
                        width="100%"
                        onKeyUp={(event) => {
                            if (event.key == "Enter") {
                                window.electronAPI.run(ref.current.querySelector("input").value);
                            }
                        }}
                    ></Input>
                </div>
                <div className="buttons">
                    <Button
                        type="submit"
                        onClick={() => {
                            window.electronAPI.run(ref.current.querySelector("input").value);
                        }}
                    >
                        确定
                    </Button>
                    <Button
                        type="normal"
                        onClick={() => {
                            window.electronAPI.close();
                        }}
                    >
                        取消
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
