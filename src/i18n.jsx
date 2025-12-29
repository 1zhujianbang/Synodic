import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const I18nContext = createContext(null)

const translations = {
  zh: {
    nav: { atlas: '图谱', insights: '洞察', docs: '文档', api: 'API' },
    cta: { explore: '探索图谱', launch: '进入应用' },
    home: {
      badge: 'Synodic 宏观实体图谱 v1.0',
      headlinePrefix: '映射全球经济的隐形',
      headlineSuffix: '不止于经济。',
      subheadline:
        'Synodic 揭示企业实体之间不可见的“引力”，把原始数据转化为可导航的经济情报宇宙。',
      pipelineTitle: '数据管线',
      pipelineSubtitle: '从原始信号到高保真情报。',
      rotating: ['连接', '风险', '机会'],
      steps: [
        {
          title: '采集',
          description: '聚合全球市场、新闻与公告等多源异构数据，进入统一数据湖。',
          icon: '🌪️',
        },
        {
          title: '消歧',
          description: '用 NLP 与图算法进行实体身份与关系映射，链接同名同体并消除歧义。',
          icon: '🔗',
        },
        {
          title: '分析',
          description: '基于图神经网络推理，发现隐藏结构、群落与异常传播风险。',
          icon: '🧠',
        },
        {
          title: '洞察',
          description: '通过交互式看板与实时 API 告警，输出可执行的市场情报。',
          icon: '✨',
        },
      ],
    },
    common: { previous: '上一步', next: '下一步' },
    pages: {
      insightsTitle: '洞察',
      docsTitle: '图谱体系',
      apiTitle: 'API',
      placeholder: '页面内容待补充。',
    },
    insights: {
      headline: '洞察',
      subheadline: '源自 Synodic 图谱的实时情报。监控风险、机遇与结构性变化。',
      filters: { date: '按日期筛选', report: '生成报告' },
      cards: {
        risk: '风险',
        viewAnalysis: '查看分析',
        connectSource: '连接数据源'
      },
      data: [
        {
          id: 1,
          title: "检测到供应链脆弱性",
          severity: "High",
          date: "2024-03-15",
          summary: "半导体供应链中发现关键依赖。3家一级供应商共享同一家位于冲突区的上游提供商。",
          entities: ["Nvidia", "TSMC", "ASML"]
        },
        {
          id: 2,
          title: "新兴竞争对手集群",
          severity: "Medium",
          date: "2024-03-14",
          summary: "深圳出现一个新的由5家初创公司组成的集群，其固态电池相关专利申请显示出高度语义相似性。",
          entities: ["CATL", "BYD", "Startup A"]
        },
        {
          id: 3,
          title: "监管影响模拟",
          severity: "Low",
          date: "2024-03-12",
          summary: "欧盟新AI法案的模拟影响显示，对当前运营干扰极小，但2家子公司的合规成本较高。",
          entities: ["OpenAI", "Microsoft", "EU"]
        },
        {
          id: 4,
          title: "资本流动异常",
          severity: "High",
          date: "2024-03-10",
          summary: "检测到从B板块向离岸实体的异常快速资本流出，与近期政策传闻相关。",
          entities: ["Bank A", "Fund B", "Offshore C"]
        }
      ]
    },
    api: {
      headline: 'Synodic API 参考',
      subheadline: '以编程方式访问 Synodic 宏观实体图谱。在我们图谱情报引擎之上构建您的工具。',
      sidebar: {
        intro: '简介',
        overview: '概览',
        auth: '鉴权',
        endpoints: '端点',
        entities: '实体',
        graph: '图谱遍历',
        insights: '洞察'
      },
      content: {
        overview: {
          title: '概览',
          desc: 'Synodic API 围绕 REST 组织。我们的 API 拥有可预测的资源导向 URL，返回 JSON 编码的响应，并使用标准 HTTP 响应代码、认证和动词。',
          baseUrl: '基础 URL'
        },
        auth: {
          title: '鉴权',
          desc: '通过在 Authorization 头中包含您的 API 密钥来验证您的 API 请求。'
        },
        entities: {
          title: '实体',
          searchDesc: '按名称、代码或行业搜索实体。返回带有置信度分数的匹配实体分页列表。',
          detailDesc: '检索特定实体的详细资料，包括基本元数据和风险评分。'
        },
        graph: {
          title: '图谱遍历',
          neighborsDesc: '获取实体的直接邻居。用于可视化一度连接。'
        },
        insights: {
          title: '洞察',
          latestDesc: '流式获取 Synodic 引擎检测到的最新生成洞察和异常。'
        }
      }
    },
    taxonomy: {
      headline: '宏观图谱仪 · 图谱体系',
      subheadline: '从基础事实到反事实推演的九层认知阶梯',
      introTitle: '图谱体系简介',
      introDesc: 'Synodic 宏观实体图谱助您在复杂的经济宇宙中导航。从列表中选择一种图谱类型，探索其定义与可视化模式。',
      pattern: '概览',
      tags: ['简介', '系统'],
      autoPlay: { playing: '自动播放中', resume: '恢复自动播放' },
      types: [
        {
          id: 'entity-event',
          title: '实体-事件关系图谱',
          question: '谁在何时何地对谁做了什么？',
          definition: '一种以事件作为核心知识单元的知识图谱。它系统化地建模现实世界中发生的事件、参与事件的实体（如人物、组织、地点），以及实体在事件中承担的语义角色。',
          pattern: '(实体, 角色, 事件)',
          tags: ['基础', '事理逻辑'],
        },
        {
          id: 'entity-event-temporal',
          title: '实体-事件时序图谱',
          question: '实体的生命轨迹是怎样的？',
          definition: '在实体-事件关系图谱基础上，显式标注时间戳，并依据时序关系（如“之前”、“之后”）对事件进行排序与链接。聚焦于特定实体的时序事件链。',
          pattern: '事件₁ → 事件₂ → 事件₃',
          tags: ['时序', '动态演化'],
        },
        {
          id: 'entity-entity',
          title: '实体-实体关系图谱',
          question: '实体之间存在什么静态语义关系？',
          definition: '专注于刻画实体之间稳定语义关系的图谱。建模分类学关系（IsA）、组成关系（PartA）及属性关系（合作、竞争、隶属）。',
          pattern: '(头实体, 关系, 尾实体)',
          tags: ['静态', '语义网络'],
        },
        {
          id: 'entity-entity-event',
          title: '实体-实体-事件发展图谱',
          question: '关系是如何随事件发生而变化的？',
          definition: '显式建模实体间关系随事件序列发生而变化的动态图谱。将“关系”视为随时间变化的函数，状态由触发事件驱动更新。',
          pattern: '关系(A, B, T) = F(初始, 事件流)',
          tags: ['动态', '演化'],
        },
        {
          id: 'event-entity-impact',
          title: '事件-实体发展图谱',
          question: '一个事件如何引发实体状态的级联改变？',
          definition: '以事件为驱动力的影响力传播图谱。建模核心事件如何触发后续事件，导致网络中相关实体状态发生级联改变。',
          pattern: '事件 → 状态变更 → 传播',
          tags: ['因果', '影响力'],
        },
        {
          id: 'event-event-effect',
          title: '事件-事件效应图谱',
          question: 'A类事件引发B类事件的概率与强度是多少？',
          definition: '基于因果推断理论构建的有向加权网络。节点是事件类型，边表示潜在因果影响，权重推演影响强度、概率或滞后周期。',
          pattern: '事件A --(概率/强度)--> 事件B',
          tags: ['因果推断', '量化'],
        },
        {
          id: 'community',
          title: '社区图谱',
          question: '宏观系统中存在哪些自发形成的利益集团？',
          definition: '通过社区发现算法识别出的内部连接紧密、外部稀疏的实体子集。揭示利益集团、阵营或功能模块，提供降维宏观视野。',
          pattern: '社区 = {实体集, 内部强连接}',
          tags: ['宏观', '降维'],
        },
        {
          id: 'hybrid-simulation',
          title: '事件发展效应混合图谱',
          question: '如果这一系列事件发生，世界会怎样演变？',
          definition: '动态仿真模型。以时序事件流为输入，驱动混合网络计算事件流在实体网络上引发的连锁变化过程。',
          pattern: '输入事件流 → 仿真引擎 → 演化结果',
          tags: ['仿真', '推演'],
        },
        {
          id: 'counterfactual',
          title: '反事件效应图谱',
          question: '如果没有发生那件事，今天会有何不同？',
          definition: '基于混合图谱的反事实推理。定义“反事件”或干预历史状态，推演替代路径，量化评估历史事件的真实影响。',
          pattern: '现实路径 vs 反事实路径 (Delta)',
          tags: ['反事实', '评估'],
        },
      ],
    },
  },
  en: {
    nav: { atlas: 'Atlas', insights: 'Insights', docs: 'Docs', api: 'API' },
    cta: { explore: 'Explore the Atlas', launch: 'Launch App' },
    home: {
      badge: 'Synodic Macro Entity Atlas v1.0',
      headlinePrefix: 'Mapping the Hidden',
      headlineSuffix: 'Not only for the Global Economy.',
      subheadline:
        'Synodic reveals the invisible gravitational pulls between corporate entities, transforming raw data into a navigable universe of economic intelligence.',
      pipelineTitle: 'The Data Pipeline',
      pipelineSubtitle: 'From raw signals to high-fidelity intelligence.',
      rotating: ['Connections', 'Risks', 'Opportunities'],
      steps: [
        {
          title: 'Ingestion',
          description:
            'Aggregating multi-source heterogenous data from global markets, news feeds, and corporate filings into a unified data lake.',
          icon: '🌪️',
        },
        {
          title: 'Resolution',
          description:
            'Entity Identity & Relation Mapping using advanced NLP and graph algorithms to resolve disambiguities and link entities.',
          icon: '🔗',
        },
        {
          title: 'Analysis',
          description:
            'Graph Neural Network Inference to detect hidden patterns, community structures, and anomaly propagation risks.',
          icon: '🧠',
        },
        {
          title: 'Insight',
          description:
            'Delivering actionable Market Intelligence through interactive dashboards and real-time API alerts.',
          icon: '✨',
        },
      ],
    },
    common: { previous: 'Previous', next: 'Next' },
    pages: {
      insightsTitle: 'Insights',
      docsTitle: 'Graph Taxonomy',
      apiTitle: 'API',
      placeholder: 'Content coming soon.',
    },
    insights: {
      headline: 'Insights',
      subheadline: 'Real-time intelligence derived from the Synodic Graph. Monitoring risks, opportunities, and structural changes.',
      filters: { date: 'Filter by Date', report: 'Generate Report' },
      cards: {
        risk: 'Risk',
        viewAnalysis: 'View Analysis',
        connectSource: 'Connect Data Source'
      },
      data: [
        {
          id: 1,
          title: "Supply Chain Fragility Detected",
          severity: "High",
          date: "2024-03-15",
          summary: "Critical dependency identified in semiconductor supply chain. 3 tier-1 suppliers share a single upstream provider in a conflict zone.",
          entities: ["Nvidia", "TSMC", "ASML"]
        },
        {
          id: 2,
          title: "Emerging Competitor Cluster",
          severity: "Medium",
          date: "2024-03-14",
          summary: "A new cluster of 5 startups in Shenzhen shows high semantic similarity in patent filings related to solid-state batteries.",
          entities: ["CATL", "BYD", "Startup A"]
        },
        {
          id: 3,
          title: "Regulatory Impact Simulation",
          severity: "Low",
          date: "2024-03-12",
          summary: "Simulated impact of the new EU AI Act shows minimal disruption to current operations but high compliance costs for 2 subsidiaries.",
          entities: ["OpenAI", "Microsoft", "EU"]
        },
        {
          id: 4,
          title: "Capital Flow Anomaly",
          severity: "High",
          date: "2024-03-10",
          summary: "Unusual rapid capital outflow detected from Sector B towards offshore entities, correlating with recent policy rumors.",
          entities: ["Bank A", "Fund B", "Offshore C"]
        }
      ]
    },
    api: {
      headline: 'Synodic API Reference',
      subheadline: 'Programmatic access to the Synodic Macro Entity Atlas. Build your own tools on top of our graph intelligence engine.',
      sidebar: {
        intro: 'Introduction',
        overview: 'Overview',
        auth: 'Authentication',
        endpoints: 'Endpoints',
        entities: 'Entities',
        graph: 'Graph Traversal',
        insights: 'Insights'
      },
      content: {
        overview: {
          title: 'Overview',
          desc: 'The Synodic API is organized around REST. Our API has predictable resource-oriented URLs, returns JSON-encoded responses, and uses standard HTTP response codes, authentication, and verbs.',
          baseUrl: 'Base URL'
        },
        auth: {
          title: 'Authentication',
          desc: 'Authenticate your API requests by including your API key in the Authorization header.'
        },
        entities: {
          title: 'Entities',
          searchDesc: 'Search for entities by name, ticker, or industry. Returns a paginated list of matching entities with confidence scores.',
          detailDesc: 'Retrieve detailed profile information for a specific entity, including basic metadata and risk scores.'
        },
        graph: {
          title: 'Graph Traversal',
          neighborsDesc: 'Get immediate neighbors of an entity. Useful for visualizing first-degree connections.'
        },
        insights: {
          title: 'Insights',
          latestDesc: 'Stream the latest generated insights and anomalies detected by the Synodic engine.'
        }
      }
    },
    taxonomy: {
      headline: 'Synodic Graph Taxonomy',
      subheadline: 'Nine Layers of Cognition: From Basic Facts to Counterfactual Reasoning',
      introTitle: 'Introduction',
      introDesc: 'Synodic Macro Entity Atlas helps you navigate the complex economic universe. Select a graph type from the list to explore its definition and visual pattern.',
      pattern: 'Overview',
      tags: ['Intro', 'System'],
      autoPlay: { playing: 'Auto Playing', resume: 'Resume Auto Play' },
      types: [
        {
          id: 'entity-event',
          title: 'Entity-Event Relation Graph',
          question: 'Who did what to whom, when and where?',
          definition: 'A knowledge graph with events as core units. Systematically models real-world events, participating entities (people, orgs, locations), and their semantic roles.',
          pattern: '(Entity, Role, Event)',
          tags: ['Basic', 'Event Logic'],
        },
        {
          id: 'entity-event-temporal',
          title: 'Entity-Event Temporal Graph',
          question: 'What is the life trajectory of an entity?',
          definition: 'Adds timestamps to the Entity-Event Graph and orders events sequentially. Focuses on the temporal event chain of specific entities.',
          pattern: 'Event₁ → Event₂ → Event₃',
          tags: ['Temporal', 'Evolution'],
        },
        {
          id: 'entity-entity',
          title: 'Entity-Entity Relation Graph',
          question: 'What static semantic relationships exist between entities?',
          definition: 'Focuses on stable semantic relationships. Models taxonomic (IsA), compositional (PartA), and attribute relationships (Cooperation, Competition).',
          pattern: '(Head, Relation, Tail)',
          tags: ['Static', 'Semantic Net'],
        },
        {
          id: 'entity-entity-event',
          title: 'Entity-Entity-Event Evolution Graph',
          question: 'How do relationships change as events occur?',
          definition: 'Models how relationships change driven by event sequences. Treats "relationship" as a time-varying function updated by trigger events.',
          pattern: 'Rel(A, B, T) = F(Init, Events)',
          tags: ['Dynamic', 'Evolution'],
        },
        {
          id: 'event-entity-impact',
          title: 'Event-Entity Impact Graph',
          question: 'How does an event cause cascading state changes?',
          definition: 'Event-driven impact propagation. Models how a core event triggers subsequent events, causing cascading state changes in the entity network.',
          pattern: 'Event → State Change → Cascade',
          tags: ['Causal', 'Impact'],
        },
        {
          id: 'event-event-effect',
          title: 'Event-Event Effect Graph',
          question: 'What is the probability/intensity of Event A causing Event B?',
          definition: 'Directed weighted network based on causal inference. Nodes are event types, edges represent potential causal influence with weight/lag.',
          pattern: 'Event A --(Prob/Int)--> Event B',
          tags: ['Causal Inference', 'Quant'],
        },
        {
          id: 'community',
          title: 'Community Graph',
          question: 'What spontaneous interest groups exist in the macro system?',
          definition: 'Identifies dense subsets of entities via community detection algorithms. Reveals interest groups, camps, or functional modules.',
          pattern: 'Community = {Entities, Strong Ties}',
          tags: ['Macro', 'Reduction'],
        },
        {
          id: 'hybrid-simulation',
          title: 'Event-Evolution Hybrid Graph',
          question: 'If these events happen, how will the world evolve?',
          definition: 'Dynamic simulation model. Uses time-series event streams to drive a hybrid network, calculating the chain reaction of states and relationships.',
          pattern: 'Input Stream → Engine → Result',
          tags: ['Simulation', 'Deduction'],
        },
        {
          id: 'counterfactual',
          title: 'Counter-Event Effect Graph',
          question: 'What if that event never happened?',
          definition: 'Counterfactual reasoning based on hybrid graphs. Defines "counter-events" to simulate alternative paths and quantify the real impact of history.',
          pattern: 'Real Path vs Counter Path (Delta)',
          tags: ['Counterfactual', 'Evaluation'],
        },
      ],
    },
  },
}

function getInitialLocale() {
  const saved = typeof window !== 'undefined' ? window.localStorage.getItem('synodic.locale') : null
  if (saved === 'zh' || saved === 'en') return saved
  const lang = typeof navigator !== 'undefined' ? navigator.language : 'en'
  return lang.toLowerCase().startsWith('zh') ? 'zh' : 'en'
}

export function I18nProvider({ children }) {
  const [locale, setLocale] = useState(getInitialLocale)

  const setLocaleSafe = useCallback((next) => {
    setLocale(next)
    if (typeof window !== 'undefined') window.localStorage.setItem('synodic.locale', next)
  }, [])

  const toggleLocale = useCallback(() => {
    setLocaleSafe(locale === 'zh' ? 'en' : 'zh')
  }, [locale, setLocaleSafe])

  const t = useCallback(
    (key) => {
      const parts = String(key).split('.')
      let current = translations[locale]
      for (const part of parts) {
        if (!current || typeof current !== 'object') return key
        current = current[part]
      }
      return current ?? key
    },
    [locale]
  )

  const value = useMemo(() => ({ locale, setLocale: setLocaleSafe, toggleLocale, t }), [locale, setLocaleSafe, toggleLocale, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}

