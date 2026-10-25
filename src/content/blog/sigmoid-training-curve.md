---
title: 训练曲线的形状，藏在 Hessian 谱里
description: 不再问“能不能用一条 sigmoid”，而是把训练损失拆成 Hessian 模态的叠加。固定谱跨度、改变模态数与权重分布后，同一个 sigmoid 的成败会翻转。附交互式谱图与误差图。
pubDate: 2026-10-25
cover: /img/covers/0D5AF034C477A7592E6900E01562688D.png
labels: [research]
---

> **结论：** 训练曲线不是一条 sigmoid，而是 Hessian 谱的加权指数和。在固定谱跨度 100、同一评价网格和同一拟合协议下，只有两个分离模态时 sigmoid 失败（RMSE 0.060、maxabs 0.086）；把谱填成 4、8、16、32 个模态后，同一 sigmoid 全部通过，RMSE 从 0.022 降到 0.017。权重偏向快模态时误差更小（0.0019），偏向慢模态时更大（0.028）。所以原来的问题应该改写：不是“sigmoid 行不行”，而是“谱有多稀疏、权重落在哪里”。

---

## 1. 先看一条曲线：慢—快—慢

把训练损失画在对数时间轴上，几乎总会看到三段：

1. **慢启动**：损失贴近 1，看不出变化；
2. **快速下降**：损失在中间一段迅速掉下去；
3. **慢尾**：剩下一点点损失，拖很久。

这看起来很像 sigmoid，于是很多人直接拿 sigmoid 去拟合。但这条曲线并不是 sigmoid 生成的。它是若干条指数衰减叠加出来的，每一段对应谱里的一个模态。

下面的交互图可以直接对比“稀疏谱”和“填满谱”：

<iframe src="/experiments/d4-spectrum/curves.html" style="width:100%;height:760px;border:1px solid #e5e7eb;border-radius:12px;background:#fff" title="Hessian 谱与训练曲线交互图"></iframe>

上图：蓝线是实测损失，红点线是 sigmoid 拟合，灰色竖线是每个模态的拐点时间 $1/(\eta\lambda_i)$。背景三段分别是慢启动、快速下降、慢尾。下图是与上图横轴对齐的谱分布：每个模态一个竖条，高度是它在初始损失里的权重。

把条件切到 `k32_uniform`，你会看到谱变成一把梳子，曲线仍然有 S 形，但 sigmoid 反而拟合得更好。这就是本文的核心现象。

---

## 2. 相关工作：这条曲线早就被拆过

把训练曲线理解成“若干模态的叠加”，并不是新想法：

- **Saxe, McClelland & Ganguli (2013)** 对深层线性网络给出了精确解。每个输入输出模态的强度满足闭式方程；深度 ≥ 2 时模态之间竞争，曲线才会出现平台和陡降。[arXiv:1312.6120](https://arxiv.org/abs/1312.6120)
- **Jacot et al. (2021)** 的 saddle-to-saddle 图像进一步说明，深层的多阶段曲线来自依次经过不同秩的鞍点。[arXiv:2106.15933](https://arxiv.org/abs/2106.15933)
- **Bordelon, Canatar & Pehlevan (2020)** 把核回归的误差按谱分量分解，说明不同谱分量会被依次拟合。[arXiv:2002.02561](https://arxiv.org/abs/2002.02561)
- **Spigler, Geiger & Wyart (2019)** 表明幂律的核谱会给出幂律学习曲线，指数由谱和目标的衰减共同决定。[arXiv:1905.10843](https://arxiv.org/abs/1905.10843)
- **Sollich & Halees (2002)** 从协方差算子的特征分解出发推导学习曲线，并指出“只看谱”的近似存在原理性极限。[Neural Computation 14:1393](https://doi.org/10.1162/089976602753712990)
- **Viering & Loog (2022)** 的学习曲线综述强调：曲线形状非常多样，没有通用模型，单函数拟合要谨慎。[arXiv:2103.10948](https://arxiv.org/abs/2103.10948)
- **Xie et al. (2022)** 发现训练好的深度网络 Hessian 谱常呈幂律结构，为“用谱描述”提供了经验动机。[arXiv:2201.13011](https://arxiv.org/abs/2201.13011)

需要说清楚的是：这些工作大多研究**泛化误差随样本数**的曲线，或者**深层非线性网络**的动力学；本文研究的是**固定特征的单层模型里，训练损失随步数**的曲线。数学结构相同（谱加权求和），对象不同。

本文要补的也不是“谱决定曲线”这个一般命题，而是一个更窄的定量问题：

> 在同一网格、同一阈值下，sigmoid 的拟合误差如何随谱的**填充程度**和**权重分布**变化？

---

## 3. 模型：损失可以拆成模态

单层线性回归：

$$
\hat y=X\theta,\qquad
L(\theta)=\frac{1}{2n}\lVert X\theta-y\rVert^2.
$$

在目标 $\theta^\star$ 处展开：

$$
L=\frac12(\theta-\theta^\star)^\top H(\theta-\theta^\star),
\qquad
H=\frac{X^\top X}{n}=V\Lambda V^\top.
$$

把误差投影到特征向量上，$c_i=v_i^\top(\theta-\theta^\star)$：

$$
L=\frac12\sum_i\lambda_i c_i^2.
$$

梯度下降下每个模态独立演化：

$$
c_i(k+1)=(1-\eta\lambda_i)c_i(k),
$$

所以

$$
L(k)=\sum_i w_i\,(1-\eta\lambda_i)^{2k}
=\sum_i w_i\,e^{-a_i k},
\qquad
a_i=-2\ln(1-\eta\lambda_i).
$$

这里 $w_i$ 是第 $i$ 个模态在初始损失里的权重，$\sum_i w_i=1$。

**这条式子就是一个 Laplace 变换**：训练曲线是谱测度 $\sum_i w_i\delta_{a_i}$ 的拉普拉斯变换。给定了谱，曲线就定了；反过来，曲线原则上编码了谱，只是反演很不稳定。

每个模态有一个特征时间：

$$
t_i=\frac{1}{\eta\lambda_i}.
$$

在这些时间点附近，曲线会出现一个“拐点”或“台阶”。

---

## 4. 一条 sigmoid 只有一个拐点

候选曲线

$$
H(t)=\frac{1}{1+(t/t_{50})^\beta}
$$

在对数时间 $x=\log t$ 上是标准 logistic：

$$
H=\sigma\!\left(\beta(x-\log t_{50})\right).
$$

它只有一个拐点，位于 $t=t_{50}$，并且对数斜率恒为 $-\beta$。

但“有 S 形”并不是 sigmoid 的专利。**单独一条指数衰减，在对数时间上也有拐点。** 令 $f(t)=e^{-at}$，$x=\log t$：

$$
f=e^{-a e^x},
\qquad
f''(x)=a e^x f\,(a e^x-1).
$$

拐点在

$$
t=\frac1a,
\qquad
f=e^{-1}\approx0.368,
$$

而不是 0.5。也就是说：

- 指数衰减也会呈现“慢—快—慢”；
- 它的拐点位置由时间常数决定；
- 它的拐点值不是 0.5。

所以，看到 S 形并不能推出“这条曲线是 sigmoid 生成的”。真正有信息的是：**有几个拐点、分别在哪里、权重多大**。

---

## 5. 从 Hessian 看三段

设谱的范围是 $[\lambda_{\min},\lambda_{\max}]$，对应两个边界时间：

$$
T_{\text{fast}}=\frac{1}{\eta\lambda_{\max}},
\qquad
T_{\text{slow}}=\frac{1}{\eta\lambda_{\min}}.
$$

于是曲线可以按谱分成三段：

| 阶段 | 时间范围 | 谁在主导 |
|---|---|---|
| 慢启动 | $t\ll T_{\text{fast}}$ | 所有模态都还活着，损失接近 1 |
| 快速下降 | $T_{\text{fast}}<t<T_{\text{slow}}$ | 模态按从快到慢依次退出 |
| 慢尾 | $t\gg T_{\text{slow}}$ | 只剩最慢的模态，指数拖尾 |

这三段的**宽度**由谱跨度决定：跨度 100 时，$T_{\text{fast}}=10$、$T_{\text{slow}}=1000$，快速段横跨两个数量级。

而这三段的**形状**由谱的密度和权重决定：

- 只有两个模态：两个台阶，中间是空的，曲线像两级楼梯；
- 谱被填满：台阶彼此重叠，曲线变成平滑的 S 形；
- 权重集中在快模态：曲线很快掉完，剩下的慢尾很轻；
- 权重集中在慢模态：曲线有一条很长、很重的尾巴。

这就是“从 Hessian 看先慢后快再慢”的意思：**三段不是三种机制，而是同一组模态在不同时间窗口里的可见部分。**

---

## 6. 新实验：固定跨度，改变谱

为了把上面的说法变成可检验的预测，我固定谱跨度 100，只改两件事：

1. **填充程度**：$k=2,4,8,16,32$ 个几何分布的模态，权重均匀；
2. **权重分布**：$k=8$ 时，权重分别取 $w_i\propto\lambda_i^p$，$p=+1,0,-1$。

其他全部固定：

- 单层线性模型，$n=d=k$；
- 全批量 SGD，$\eta=0.1$，无动量、无权重衰减，零初值；
- 10,000 步；
- 同一 150 点对数网格（0–4997）；
- 同一 sigmoid 参数范围和最小二乘拟合协议；
- 每个条件 3 个坐标旋转 seed。

预注册了四条预测：

- **P1**：$k=2$ 两条阈值都失败，$k\ge4$ 全部通过；
- **P2**：$k=8$ 时，偏向快模态的误差低于均匀，偏向慢模态的误差高于均匀；
- **P3**：固定跨度、均匀权重时，RMSE 和 maxabs 随 $k$ 单调下降；
- **P4**：$\beta$ 随 $k$ 上升，$t_{50}$ 的变化不超过 1.1 倍。

需要说明：这四条预测是在一次小规模探索性计算之后写下的，正式实验是 21 个 cell 的重复与扩展，不是盲预测。预注册保证的是“跑正式实验之前条件、判据和预测已经固定”，不是“事先完全不知道方向”。

---

## 7. 结果

### 填充谱：模态数从 2 到 32

| $k$ | RMSE | maxabs | 通过 | $\beta$ | $t_{50}$（步） | 有效模态数 |
|---:|---:|---:|:---:|---:|---:|---:|
| 2 | 0.060285 | 0.085569 | 否 | 0.531 | 28.1 | 2.0 |
| 4 | 0.021611 | 0.036178 | 是 | 0.755 | 29.1 | 4.0 |
| 8 | 0.018237 | 0.029747 | 是 | 0.841 | 29.4 | 8.0 |
| 16 | 0.017168 | 0.028236 | 是 | 0.882 | 29.5 | 16.0 |
| 32 | 0.016739 | 0.027696 | 是 | 0.902 | 29.6 | 32.0 |

**四条预测全部成立。**

最值得注意的是：谱跨度没有变，端点模态也没有变，只是**在中间补了模态**，sigmoid 就从失败变成通过。RMSE 下降约 3.6 倍，maxabs 下降约 3.1 倍。

### 权重分布：8 个模态

| 权重 | RMSE | maxabs | 通过 | $\beta$ | $t_{50}$（步） |
|---|---:|---:|:---:|---:|---:|
| $w\propto\lambda$（偏向快） | 0.001944 | 0.013688 | 是 | 1.200 | 5.6 |
| 均匀 | 0.018237 | 0.029747 | 是 | 0.841 | 29.4 |
| $w\propto1/\lambda$（偏向慢） | 0.027804 | 0.046280 | 是 | 1.157 | 162.7 |

偏向快模态时，曲线由几个相邻的快模态主导，几乎像单模态，sigmoid 拟合得极好；偏向慢模态时，慢尾很重，误差接近阈值但仍然通过。

### 误差随模态数的变化

<iframe src="/experiments/d4-spectrum/scan.html" style="width:100%;height:690px;border:1px solid #e5e7eb;border-radius:12px;background:#fff" title="谱填充与 sigmoid 误差"></iframe>

左图：固定跨度 100，均匀权重，$k$ 从 2 增加到 32。右图：固定 $k=8$，改变权重分布。虚线是注册阈值。

---

## 8. 这改变了什么

### 原来的结论要改写

之前的结果是：α=.9、两模态、谱比 100 时，最小二乘 sigmoid 失败（RMSE 0.051、maxabs 0.080）。

现在可以把这句话说得更准确：

> 失败发生在**两个分离模态、中间没有其他模态**的稀疏谱上。把同样的谱跨度用 4 个以上的模态填满，同一个 sigmoid、同一组阈值就会通过。

所以“sigmoid 拟合不好”不是 sigmoid 的固有属性，而是**谱的稀疏性**在拟合残差里的表现。

### 为什么两个模态最难

两个模态的曲线是

$$
L=w_1e^{-a_1t}+w_2e^{-a_2t}.
$$

两个时间尺度相差两个数量级，曲线有两个清楚的特征时间：一个在 10 步附近，一个在 1000 步附近。sigmoid 只有一个拐点，只能把这两个台阶折中成一个。

填模态相当于在两级台阶之间加中间台阶。台阶越密，宏观曲线越平滑，单拐点的 sigmoid 越够用。

### 权重的位置同样重要

有效模态数 $1/\sum w_i^2$ 不能单独解释误差：

- 两模态 α=.9 的有效模态数是 1.2，却失败；
- 偏向快模态的 $k=8$ 有效模态数约 3.1，却拟合得最好。

差别在于权重落在谱的哪一端，以及相邻被加权模态之间的间隔。**只看“有几个模态”不够，要看“权重和间隔怎么分布”。**

### 对实践的启示

如果你要用一个简单函数概括训练曲线，先看谱：

- 谱稀疏、有明显间隔：单 sigmoid 会漏掉台阶，残差呈系统性结构；
- 谱密集或权重集中在一个窄带：单 sigmoid 往往够用；
- 报告拟合误差时，同时报告谱跨度、模态数和权重分布，否则“通过/失败”不可复现。

---

## 9. 边界

这套分析仍然限制在：

- 固定特征的单层线性模型；
- 零初始化、全批量、无动量、无权重衰减、无噪声；
- 静态 Hessian：训练过程中 $H$ 不变；
- 有限网格和注册阈值。

真实网络的 Hessian 会随训练变化，谱本身在移动；那时“模态”只是一个瞬时近似。深层网络还会出现模态竞争和 saddle-to-saddle，曲线可能有多阶段结构，这些都不是本文覆盖的。

另外，本文只做了“谱 → 曲线”的正向计算。从曲线反演谱是病态问题，尤其在有噪声时；我们不做这种声称。

最后，min-maxabs 证书仍未解决：本文的“失败/通过”都指最小二乘选出的那条 sigmoid，不是“所有参数都不行”。

---

## 10. 复现与证据

- 预注册：`r005_spectral_shape/preregistration.json`
- 训练与拟合：`r005_spectral_shape/run_spectral.py`
- 21 个 cell 的曲线与元数据：`r005_spectral_shape/results/`
- 摘要：`r005_spectral_shape/summary.json`
- 本页图表：由 `build_spectrum_assets.py` 从保存数组生成，未重新训练

所有曲线与解析模态和的最大差不超过 $3.5\times10^{-15}$；报告生成时会核对哈希、网格、递推和误差。

---

## 11. 下一步

1. **时变谱**：在深层线性网络里，Hessian 随训练变化。看“拐点密度”是否仍能预测 sigmoid 拟合误差。
2. **反演**：在无噪声条件下，从曲线恢复谱的可行性；有噪声时能恢复到哪里。
3. **真实网络**：在小型 MLP 上估计局部 Hessian 谱，检验“稀疏谱更难被单 sigmoid 概括”是否仍是定性规律。

---

## 参考文献

1. Saxe, McClelland & Ganguli. *Exact solutions to the nonlinear dynamics of learning in deep linear neural networks.* [arXiv:1312.6120](https://arxiv.org/abs/1312.6120)
2. Jacot, Ged, Şimşek, Hongler & Gabriel. *Saddle-to-Saddle Dynamics in Deep Linear Networks.* [arXiv:2106.15933](https://arxiv.org/abs/2106.15933)
3. Bordelon, Canatar & Pehlevan. *Spectrum Dependent Learning Curves in Kernel Regression and Wide Neural Networks.* [arXiv:2002.02561](https://arxiv.org/abs/2002.02561)
4. Spigler, Geiger & Wyart. *Asymptotic learning curves of kernel methods.* [arXiv:1905.10843](https://arxiv.org/abs/1905.10843)
5. Sollich & Halees. *Learning curves for Gaussian process regression: approximations and bounds.* [DOI:10.1162/089976602753712990](https://doi.org/10.1162/089976602753712990)
6. Viering & Loog. *The Shape of Learning Curves: a Review.* [arXiv:2103.10948](https://arxiv.org/abs/2103.10948)
7. Xie, Tang, Cai, Sun & Li. *On the Power-Law Hessian Spectrums in Deep Learning.* [arXiv:2201.13011](https://arxiv.org/abs/2201.13011)
