import React, { useEffect, useRef, useState } from "react";
import Input from "../Input/Input.js";
import Button from "../Button/Button.js";
import "./MainPage.scss";

let history = [];
function MainPage() {
    const ref = useRef(null);
    const root = useRef(null);
    const [historyPointer, setHistoryPointer] = useState(0);
    useEffect(() => {
        ref.current.querySelector("input").focus();
        window.electronAPI.getHistory().then((value) => {
            history = value.reverse();
            ref.current.querySelector("input").value = history[historyPointer] || "";
            ref.current.querySelector("input").select();
        });
    }, []);
    useEffect(() => {
        console.log(history, historyPointer);
        if (historyPointer === -1) {
            ref.current.querySelector("input").value = "";
        } else {
            ref.current.querySelector("input").value = history[historyPointer] || "";
        }
        ref.current.querySelector("input").select();
    });
    return (
        <div className="mainPage">
            <div className="contents">
                <div className="left">
                    <div className="image"></div>
                </div>
                <div className="right">
                    <div>Linux 将根据你所输入的名称，为你打开相应的程序、文件夹、文档或 Internet 资源</div>
                </div>
            </div>

            <div className="container">
                <div className="input" ref={ref} spellCheck={false}>
                    <span>打开(O):</span>
                    <Input
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                window.electronAPI.run({
                                    command: ref.current.querySelector("input").value,
                                    root: root.current.checked
                                });
                            } else if (event.key === "ArrowDown") {
                                event.preventDefault();
                                setHistoryPointer(Math.max(-1, historyPointer - 1));
                            } else if (event.key === "ArrowUp") {
                                event.preventDefault();
                                setHistoryPointer(Math.min(history.length - 1, historyPointer + 1));
                            }
                        }}
                    ></Input>
                </div>
                <div className="checkbox">
                    <label>
                        <input type="checkbox" ref={root} />
                        &nbsp; 以超级用户身份创建此任务
                    </label>
                </div>
                <div className="buttons">
                    <Button
                        type="submit"
                        onClick={() => {
                            window.electronAPI.run({
                                command: ref.current.querySelector("input").value,
                                root: root.current.checked
                            });
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
                    <Button
                        type="normal"
                        onClick={() => {
                            window.electronAPI.openFile().then((value) => {
                                ref.current.querySelector("input").value = value || ref.current.querySelector("input").value;
                            });
                        }}
                    >
                        浏览(B)...
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
