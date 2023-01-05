/**
 * 初始化着色器函数 initShader
 * @param {!WebGLRenderingContext} gl WebGL对象
 * @param {string} vertexShaderSource 顶点着色器源码
 * @param {string} fragmentShaderSource 片源着色器源码
 */
function initShader(gl, vertexShaderSource, fragmentShaderSource) {
    // 创建顶点着色器对象
    let vertexShader = gl.createShader(gl.VERTEX_SHADER);

    // 创建片源着色器对象
    let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    // 引入顶点 & 片源着色器源代码
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // 编译顶点 & 片源着色器
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // 创建程序对象program
    let program = gl.createProgram();

    // 附着顶点 & 片源着色器到program
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);

    // 链接program
    gl.linkProgram(program);

    // 调试使用program失败，抛出异常
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        const info = gl.getProgramInfoLog(program);
        throw new Error(`Could not compile WebGL program. \n\n ${info}`);
    }

    // 返回程序对象program
    return program;
}

/**
 * 顶点数据配置函数 vertexBuffer
 * @param {Float32Array} data 顶点数据
 * @param {number} position 顶点位置
 * @param {number} n 间隔数量
 * @param {!WebGLRenderingContext} gl WebGL对象
 */
function vertexBuffer(data, position, n, gl) {
    // 创建缓冲区对象
    let buffer = gl.createBuffer();

    // 绑定缓冲区对象，激活buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    // 顶点数据传入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);

    // 缓冲区数据按照一定的规律传递给位置变量
    gl.vertexAttribPointer(position, n, gl.FLOAT, false, 0, 0);

    // 允许数据传递
    gl.enableVertexAttribArray(position);
}
