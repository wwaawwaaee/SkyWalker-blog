---
title: 神经网络Identifiability问题
description: “深度学习模型可识别性”可以分成三条主线：一是神经网络参数是否能由其实现的函数唯一恢复；二是深度生成模型、表示学习、解缠表示中的潜变量是否可识别；三是用代数几何、张量分解、非线性独立成分分析等工具给出可识别性条件。下面是整理后的检索结果与阅读路线。
pubDate: 2026-06-01
cover: /img/blog/_2025-07-20_231319_325.jpg
labels: [研究]
---

Identifiability is what it means to learn the right latent space
可识别性意味着学习正确的潜在空间

“深度学习模型可识别性”可以分成三条主线：一是神经网络参数是否能由其实现的函数唯一恢复；二是深度生成模型、表示学习、解缠表示中的潜变量是否可识别；三是用代数几何、张量分解、非线性独立成分分析等工具给出可识别性条件。下面是整理后的阅读路线。

## 1. 问题的数学表述

深度学习中的可识别性通常不是指分类器“能不能识别某类对象”，而是指参数或潜在结构是否由可观测分布或输入输出函数唯一决定。一个抽象表述是：给定模型族
$$
\mathcal{M}=\{P_\theta:\theta\in\Theta\},
$$

若

$$
P_{\theta_1}=P_{\theta_2}
\quad\Longrightarrow\quad
\theta_1\sim \theta_2,
$$

则称模型在等价关系 $\sim$ 下可识别。对于神经网络，$\sim$ 往往至少包含神经元置换、正齐次激活下的尺度变换、符号变换、潜变量坐标变换等平凡不确定性。例如 ReLU 网络中常见的等价变换为

$$
W_{\ell+1}D^{-1}\,\sigma(DW_\ell x)=W_{\ell+1}\sigma(W_\ell x),
$$

其中 $D$ 是正对角矩阵。因而严格可识别性通常只能要求“模掉置换与正尺度变换后的唯一性”。

---

## 2. 神经网络参数可识别性：由函数恢复网络参数

这条线研究如下问题：若知道一个前馈神经网络实现的函数

$$
f_\theta:\mathbb{R}^{d_0}\to \mathbb{R}^{d_L},
$$

能否唯一恢复其权重、偏置、层宽、连接结构等？核心困难来自过参数化、隐藏神经元置换、ReLU 正齐次性、冗余神经元、死神经元、层间等价重参数化。

### 代表文献

1. **Parameter identifiability of a deep feedforward ReLU neural network**
   Joachim Bona-Pellissier, François Bachoc, François Malgouyres, 2021/2023.
   链接：<https://arxiv.org/abs/2112.12982>
   这篇是深度 ReLU 全连接网络参数可识别性的核心文献之一。作者给出若干条件，使得网络参数可由其在输入空间子集上实现的函数唯一确定，唯一性是模掉神经元置换与正尺度变换后的唯一性。论文也明确指出参数可恢复既可能带来解释性与理论保证，也可能带来攻击风险。检索结果显示其摘要明确说：在若干条件下，深度全连接 ReLU 网络参数可由函数唯一识别，模掉置换与正重缩放。来源见 arXiv 页面。

2. **Neural network identifiability for a family of sigmoidal nonlinearities**
   Verner Vlačić, Helmut Bölcskei, 2019.
   链接：<https://arxiv.org/abs/1906.06994>
   研究任意深度、任意连接结构下带某类 S 形非线性的网络可识别性。它把早期单隐层和全连接深层结果推广到更一般的图结构，给出泛型条件。适合用来理解“架构、权重、偏置是否由输入输出映射决定”这一基本问题。

3. **Stable recovery of entangled weights: Towards robust identification of deep neural networks from minimal samples**
   链接：<https://www.sciencedirect.com/science/article/pii/S1063520322000641>
   这篇更偏向“从有限样本稳定恢复权重”。它连接了可识别性与实际恢复算法：即使理论上可识别，有限样本与噪声下是否稳定恢复仍是另一层问题。

---

## 3. 多项式神经网络、代数几何与张量分解

多项式激活网络的优点是可以用代数几何和张量分解精确分析。其网络函数本身是多项式映射，参数到函数空间的映射可以看成代数映射。于是可识别性问题可以转化为代数簇维数、纤维基数、张量分解唯一性等问题。

### 代表文献

4. **Identifiability of Deep Polynomial Neural Networks**
   Konstantin Usevich, Ricardo Borsoi, Clara Dérand, Marianne Clausel, NeurIPS 2025.
   链接：<https://openreview.net/pdf?id=MrUsZfQ9pC>
   这是较新的系统性工作。论文研究深度多项式神经网络的可识别性，含偏置与不含偏置情形。其核心结论包括：非递增层宽的结构在温和条件下泛型可识别；某些编码器—解码器结构在解码器宽度增长不太快时可识别；证明方法连接深度多项式网络与低秩张量分解以及 Kruskal 型唯一性定理。OpenReview PDF 中摘要明确提到，深度多项式网络的可识别性与激活次数、层宽、张量分解唯一性密切相关。

这条线适合你如果想从更代数化、严格化的角度理解深度网络的参数到函数映射：

$$
\Phi:\Theta\to \mathcal{F},\qquad \theta\mapsto f_\theta.
$$

可识别性等价于研究 $\Phi^{-1}(f)$ 的大小。如果泛型地

$$
|\Phi^{-1}(f)|<\infty,
$$

则是有限可识别；如果模掉平凡对称性后只有一个等价类，则是全局可识别。

---

## 4. 深度生成模型与潜变量可识别性

这条线关注 VAE、流模型、深度潜变量模型中的潜变量 \(z\) 是否能从观测变量 \(x\) 的分布中唯一恢复。基本模型为

$$
z\sim p_\theta(z),\qquad x\mid z\sim p_\theta(x\mid z),
$$

或确定性形式

$$
x=g_\theta(z)+\varepsilon.
$$

困难在于：若 $h$ 是可逆变换，则

$$
x=g_\theta(z)=g_\theta(h^{-1}(h(z))),
$$

因此潜变量坐标通常不唯一。没有额外条件时，潜变量可识别性往往不成立。

### 代表文献

5. **Variational Autoencoders and Nonlinear ICA: A Unifying Framework**
   Ilyes Khemakhem, Diederik Kingma, Ricardo Monti, Aapo Hyvärinen, AISTATS 2020.
   链接：<https://proceedings.mlr.press/v108/khemakhem20a.html>
   这是可识别 VAE 的关键论文。它说明一般 VAE 的潜变量不可识别，但如果潜变量先验按分量分解，并且条件依赖于额外观测变量 \(u\)，例如标签、时间、环境变量，则可以在简单变换意义下识别真实联合分布。PMLR 页面摘要明确说：一般情况下识别真实观测—潜变量联合分布是不可能的，但在条件因子化先验和额外变量下可以实现一种有原则的解缠。

6. **Identifiability of deep generative models without auxiliary information**
   Bohdan Kivva, Goutham Rajendran, Pradeep Ravikumar, Bryon Aragam, NeurIPS 2022.
   链接：<https://proceedings.neurips.cc/paper_files/paper/2022/hash/649f080d8891ab4d4b262cb9cd52e69a-Abstract-Conference.html>
   这篇重要之处在于：它试图在没有辅助信息、没有弱监督、没有显式条件变量的情形下，证明某些深度潜变量模型的可识别性。NeurIPS 页面摘要说明，作者证明一大类具有通用逼近能力、且与实际 VAE 解码器相匹配的深度潜变量模型可识别，并提出了不同假设对应不同强度可识别性的层级。模型包括带混合先验、ReLU 或 leaky-ReLU 编码器的结构，如 VaDE 与 MFC-VAE。

7. **Conditionally Identifiable Latent Representation for Multivariate Time Series with Structural Dynamics**
   Minkey Chang, Jae-Young Kim, 2026.
   链接：<https://arxiv.org/abs/2603.22886>
   这是 2026 年的时间序列潜表示可识别性工作。它提出可识别变分动态因子模型，通过对驱动动态的创新项施加条件化，而不是直接对潜状态条件化，证明因子可识别到置换与逐分量仿射或单调可逆变换。适合关注时间序列、动态系统、因子模型与深度生成模型交叉方向。

---

## 5. 非线性独立成分分析与表示学习可识别性

非线性独立成分分析是表示学习可识别性的重要理论来源。经典线性独立成分分析在非高斯条件下可识别，但非线性情形一般不可识别。近年来的关键突破是：如果存在时间结构、辅助变量、环境变量或条件分布调制，则可以恢复潜在成分。

### 代表文献

8. **Nonlinear ICA Using Auxiliary Variables and Generalized Contrastive Learning**
   Aapo Hyvärinen, Hiroaki Sasaki, Richard E. Turner, 2018/2019.
   链接：<https://arxiv.org/abs/1805.08651>
   这篇提出用辅助变量使非线性独立成分分析可识别。辅助变量可以是时间索引、历史信息或其他可观测变量。算法上可用对比学习式判别任务实现。它是后来可识别表示学习、可识别 VAE 的基础之一。

9. **ICE-BeeM: Identifiable Conditional Energy-Based Deep Models Based on Nonlinear ICA**
   Ilyes Khemakhem, Ricardo Pio Monti, Diederik P. Kingma, Aapo Hyvärinen, 2020.
   链接：<https://arxiv.org/abs/2002.11537>
   研究条件能量模型的表示可识别性。核心结果是，在温和条件下，特征表示在函数空间中唯一，模掉缩放与置换。它把非线性独立成分分析的思想扩展到更广泛的条件能量模型。

10. **Nonlinear Independent Component Analysis for Principled Disentanglement in Unsupervised Deep Learning**
   Aapo Hyvärinen, Ilyes Khemakhem, Hiroshi Morioka, 2023.
   链接：<https://arxiv.org/abs/2303.16535>
   这是一篇综述性质的论文，系统整理非线性独立成分分析如何为无监督深度学习中的解缠表示提供可识别性理论。适合作为入门总览。它明确指出，非线性独立成分分析长期困难来自不可识别性，而时间结构和辅助信息可以恢复可识别性。

11. **Identifiable Feature Learning for Spatial Data with Nonlinear ICA**
   Hermanni Hälvä, Jonathan So, Richard E. Turner, Aapo Hyvärinen, 2023.
   链接：<https://arxiv.org/abs/2311.16849>
   把非线性独立成分分析扩展到空间数据与时空数据。它提出 \(t\)-过程潜成分模型，并证明在较一般条件下潜成分可识别。适合关注空间数据、时空数据、神经科学、地理数据或物理场建模的方向。

---

## 6. 解缠表示中的不可识别性与不可能性结果

如果你关心的是“无监督学习能否自动学到真实语义因子”，这一方向必须读不可能性结果。它们说明仅凭观测分布，很多语义因子并不能唯一确定。

### 代表文献

12. **Challenging Common Assumptions in the Unsupervised Learning of Disentangled Representations**
   Francesco Locatello 等，ICML 2019.
   链接：<https://research.google/pubs/challenging-common-assumptions-in-the-unsupervised-learning-of-disentangled-representations/>
   这是解缠表示不可识别性的代表作。Google Research 页面摘要明确指出：没有模型和数据上的归纳偏置时，无监督学习解缠表示在理论上根本不可能。作者还训练了超过 12000 个模型，在多个数据集和指标上做大规模实验，发现没有真实标签时难以选择真正解缠的模型。

13. **Weakly-Supervised Disentanglement Without Compromises**
   Francesco Locatello 等，ICML 2020.
   链接：<https://proceedings.mlr.press/v119/locatello20a.html>
   这篇是对上一条不可能性结果的建设性回应：如果允许弱监督，例如成对样本共享某些因子或只变化某些因子，则可以绕开完全无监督下的不可识别性障碍。

14. **Towards a Definition of Disentangled Representations**
   Irina Higgins 等，2018.
   链接：<https://arxiv.org/abs/1812.02230>
   这篇不直接给学习算法，而是试图用群表示理论形式化“解缠”。如果你关心“可识别的潜变量到底应该和什么数学结构对应”，这篇值得读。

---

## 7. 表示学习中的线性可识别性

深度表示经常不能在参数空间可识别，因为同一个函数可以由大量参数实现。但可以要求“函数空间中的表示”在某种弱意义下唯一。例如两个学习到的表示 $r_1(x),r_2(x)$ 满足

$$
r_2(x)=A r_1(x)
$$

其中 $A$ 为可逆线性变换，则称表示可识别到线性变换。

### 代表文献

15. **On Linear Identifiability of Learned Representations**
   Geoffrey Roeder, Luke Metz, Diederik P. Kingma, ICML 2021.
   链接：<https://proceedings.mlr.press/v139/roeder21a.html>
   这篇研究判别式表示学习中的线性可识别性。PMLR 页面摘要指出，深度网络参数化的表示函数通常在参数空间不可识别，因为网络本身过参数化；但在函数空间中，一大类判别模型的表示可以识别到线性不确定性。它是连接现代表示学习与可识别性理论的重要论文。

---

目前这个方向的共识大致是：一般深度模型在原始参数空间中通常不可识别；如果模掉置换、缩放、坐标变换等平凡不确定性，并加入结构条件、分布条件、辅助变量、时间结构、弱监督或代数约束，则可以得到不同强度的可识别性结果。对于表示学习和生成模型，可识别性通常比“预测性能”更强，它要求模型学到的内部变量具有可重复、可解释、可比较的数学含义。因此它与解缠表示、因果表示学习、科学机器学习、模型反演安全性和神经网络可解释性都有直接关系。