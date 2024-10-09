// GameElements.js

// 질문 리스트
export const questionList = [
  "친구가 내 장난감을 가져갔다면 어떻게 해야 할까?",
  "내가 놀고 싶은데, 부모님이 숙제를 하라고 하신다면 어떻게 할까?",
  "친구들이 다 같이 규칙을 어기고 놀고 있을 때 나도 그 규칙을 어길까?",
  "새로운 친구가 어색한데 다가가서 말을 걸어볼까?",
  "부모님이 원하지 않으시는 취미를 시작하고 싶은데 어떻게 해야 할까?",
  "내가 속한 그룹에서 왕따가 생기면 어떻게 할까?",
  "친구가 부정행위를 하자고 제안하면 어떻게 할까?",
  "내 꿈과 부모님의 기대가 다를 때, 어떤 길을 선택할까?",
  "사회적인 이슈에 대해 다른 사람들과 토론할 때, 내가 비난받는다면 어떻게 대응할까?",
  "대입을 앞두고 나의 진로를 확실히 결정해야 할 때, 어떻게 결정할까?",
  "성인이 된 후, 독립을 하고 싶은데 어떻게 해야 할까?",
  "대학에서 새로 만난 사람들과 친해지고 싶다면 어떻게 할까?",
  "대학 생활에서 성적이 떨어졌을 때, 어떻게 대처할까?",
  "진로에 대한 고민이 깊어지면 어떤 선택을 할까?",
  "친구와 갈등이 생겼을 때 어떻게 해결할까?",
  "첫 직장을 선택할 때, 어떤 기준을 중시할까?",
  "연애와 일이 충돌할 때 어떻게 균형을 맞출까?",
  "결혼을 생각하는 나이, 경제적 안정이 아직 확보되지 않았을 때 어떤 선택을 할까?",
  "회사에서 부당한 대우를 받았을 때 어떻게 대처할까?",
  "새로운 직장을 찾고 싶은 마음이 들 때 어떻게 할까?",
  "결혼 후 가족이 늘어나면서 개인의 꿈을 계속 쫓아야 할까?",
  "아이를 가질지 말지 결정해야 할 때 어떤 선택을 할까?",
  "직장과 가정의 균형을 맞출 수 없을 때 어떤 선택을 할까?",
  "더 큰 성공을 위해 위험을 감수해야 할 때, 어떤 선택을 할까?",
  "아이가 부모와 다른 가치를 가지기 시작할 때, 어떻게 반응할까?",
  "가까운 친구와의 관계가 점점 멀어질 때, 어떻게 대처할까?",
  "직장에서의 승진을 위해 더 많은 시간을 투자할 것인가?",
  "새로운 학문이나 기술을 배우고 싶지만 시간이 부족할 때, 어떻게 할까?",
  "건강 문제가 생겼을 때 직장과 건강 중 무엇을 우선할까?",
  "아이가 학교에서 어려움을 겪고 있을 때, 적극적으로 개입할까?",
  "결혼 생활에서 갈등이 심화되었을 때, 어떻게 해결할까?",
  "현재 직장에 만족하지 못하는 상황에서 새로운 분야에 도전할 것인가?",
  "인생의 중반에 접어들며 후회하는 일이 생겼을 때, 어떻게 할까?",
  "부모님이 나이가 들고 건강이 나빠질 때, 어떻게 보살필 것인가?",
  "자녀의 교육 문제에서 기대와 현실이 충돌할 때 어떻게 할까?",
  "결혼 생활이 점점 권태로워질 때, 무엇을 선택할까?",
  "직장에서 새로운 책임을 맡게 되었을 때, 어떻게 할까?",
  "아이들이 독립을 준비할 때, 얼마나 개입할 것인가?",
  "사회적 책임 활동에 참여할 기회가 생겼을 때, 어떻게 할까?",
  "내가 살아온 삶에 대한 만족도가 낮을 때, 어떻게 할까?",
  "자녀가 결혼이나 직장에서 큰 결정을 앞두고 있을 때, 조언할 것인가?",
  "나이가 들며 신체적 변화가 찾아올 때, 어떻게 대응할 것인가?",
  "직장에서 정년 퇴직이 다가올 때, 미래를 어떻게 준비할 것인가?",
  "결혼 생활에서 새로운 도전을 함께할 것인가, 아니면 안정성을 추구할 것인가?",
  "중년의 위기를 겪으며 큰 변화를 원할 때, 어떤 선택을 할까?",
  "자녀가 부모로부터 완전히 독립하고 나서 어떤 삶을 살 것인가?",
  "직장에서 더 이상 도전을 원하지 않을 때, 어떻게 할까?",
  "은퇴를 앞두고 재정적인 안정성이 부족할 때, 어떻게 할까?",
  "은퇴 후에 어떤 삶의 방식을 선택할 것인가?",
  "은퇴 후 가족들과의 관계를 어떻게 유지할 것인가?",
  "배우자와 함께 은퇴 후 삶을 설계할 때, 어떤 방향을 선택할 것인가?",
  "은퇴 후 생애 마지막 직업적 기회를 제안받으면 어떻게 할까?",
  "노후에 경제적인 안정이 여전히 불안할 때 어떻게 할까?",
  "자신의 인생 경험을 후배나 자녀에게 얼마나 전할 것인가?",
  "나이가 들수록 점점 더 외로움을 느낄 때 어떻게 할까?",
  "건강에 이상이 생길 때 어떤 태도를 가질 것인가?",
  "나이가 들며 가족들의 도움을 받는 것이 부담스러울 때 어떻게 할까?",
  "사회적 활동에서 완전히 은퇴할 것인가, 아니면 일부를 유지할 것인가?",
  "자녀가 부모를 돌보겠다고 할 때, 어떤 선택을 할 것인가?",
  "노년기에 새로운 배움을 시작할 의지가 있을까?",
  "과거의 잘못을 후회할 때, 그것을 어떻게 받아들일 것인가?",
  "은퇴 후 점점 더 느려지는 삶의 속도를 받아들일 것인가?",
  "죽음에 대한 생각이 찾아올 때, 어떻게 대처할 것인가?",
  "자녀나 손주와의 관계에서 어디까지 관여할 것인가?",
  "삶의 끝을 바라보며 무엇에 집중할 것인가?",
  "주변 사람들이 떠나거나 사망했을 때, 어떻게 대처할 것인가?",
  "나이 들어 병상에 누울 가능성이 커졌을 때, 어떤 선택을 할 것인가?",
  "죽음을 앞두고 가족들에게 어떤 말을 남길 것인가?",
  "이제 더 이상 삶에서 이룰 목표가 없다면, 어떻게 시간을 보낼 것인가?",
  "삶의 마지막에 가까워지며 무엇을 가장 소중히 여길 것인가?",
  "병에 걸렸을 때 끝까지 치료를 시도할 것인가, 아니면 자연스럽게 받아들일 것인가?",
  "죽음이 가까워질 때, 무엇을 후회할 것인가?",
  "생의 마지막을 어떻게 준비할 것인가?",
];

// 선택 리스트와 스탯 변화
export const choiceList = [
  {
    choices: [
      "선생님께 말하고 도와달라고 한다.",
      "친구와 직접 이야기해 보고 해결한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 }, // 선택 1의 스탯 변화
      { health: 0, stress: 0, relationships: 0, money: 0 }, // 선택 2의 스탯 변화
    ],
  },
  {
    choices: ["숙제를 먼저 하고 놀기 시작한다.", "놀다가 나중에 숙제를 한다."],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "규칙을 지키고 친구들에게 함께 지키자고 설득한다.",
      "친구들과 함께 규칙을 어기고 즐긴다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "용기를 내서 먼저 말을 건다.",
      "기다리면서 그 친구가 먼저 다가오기를 기다린다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "부모님과 대화를 해서 나의 의사를 존중해 달라고 요청한다.",
      "부모님이 반대하신다면 그 취미를 포기한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "그 사람을 돕기 위해 나서서 목소리를 낸다.",
      "나도 소외당할까 두려워 가만히 있는다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: ["정직하게 시험을 보고 거절한다.", "친구를 따라 부정행위를 한다."],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "나의 꿈을 좇으며 부모님과 대화를 통해 이해를 구한다.",
      "부모님의 기대에 따라 그들이 원하는 길을 선택한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "나의 신념을 끝까지 지키며 토론을 이어간다.",
      "상대방의 의견을 존중하며 내 신념을 유보한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "내가 가장 흥미를 느끼는 분야를 선택한다.",
      "사회적으로 안정적이고 인정받는 직업을 선택한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "부모님의 도움 없이 독립을 시작해 본다.",
      "부모님의 경제적 지원을 받아 독립을 준비한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "적극적으로 다가가 새로운 인연을 만든다.",
      "조용히 상황을 지켜보며 친해질 기회를 기다린다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "열심히 공부하여 성적을 만회한다.",
      "나의 능력을 인정하고 다른 방식으로 학업에 접근한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "안정적인 직업을 우선적으로 선택한다.",
      "내가 진정 원하는 일을 찾아 모험을 선택한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "갈등에 대해 진지하게 대화를 나누고 해결을 모색한다.",
      "잠시 거리를 두고 감정이 가라앉기를 기다린다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "경제적 안정성과 회사의 명성을 중시한다.",
      "내가 배우고 성장할 수 있는 환경을 우선한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "일의 우선순위를 정하고 연애와 일을 조화롭게 병행한다.",
      "일에 집중하며 연애는 잠시 미룬다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "경제적 안정성을 먼저 확보한 후 결혼을 진행한다.",
      "서로의 신뢰와 사랑을 바탕으로 결혼을 결정한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "회사의 인사 부서에 문제를 제기하고 해결을 요청한다.",
      "조용히 넘어가며 다른 기회를 모색한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "나의 꿈을 좇으며 부모님과 대화를 통해 이해를 구한다.",
      "부모님의 기대에 따라 그들이 원하는 길을 선택한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "갈등에 대해 진지하게 대화를 나누고 해결을 모색한다.",
      "잠시 거리를 두고 감정이 가라앉기를 기다린다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "경제적 안정성과 회사의 명성을 중시한다.",
      "내가 배우고 성장할 수 있는 환경을 우선한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "연애보다는 일을 우선적으로 고려한다.",
      "사랑이 더 중요하므로 연애에 더 집중한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "경제적 안정이 될 때까지 결혼을 미룬다.",
      "경제적 안정과 무관하게 결혼을 선택한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "회사 내의 절차를 따라 부당함을 알리고 개선을 요구한다.",
      "그냥 참고 일하며 상황이 좋아지기를 기다린다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "당장 이직을 결심하고 새로운 기회를 찾아본다.",
      "현재 직장에서 더 버티며 이직할 최적의 타이밍을 기다린다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "가족을 우선으로 하고 나의 꿈은 잠시 미룬다.",
      "가족과 함께 나의 꿈을 계속 실현해 나간다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "아이를 가져 가족을 이루는 길을 선택한다.",
      "아이를 갖기보다는 현재의 삶에 만족하며 더 성장하는 데 집중한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "가정을 우선시하여 직장 업무의 강도를 줄인다.",
      "직장을 우선시하고 가정의 일에 덜 관여한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "위험을 감수하고 큰 성공을 위해 도전한다.",
      "현재 안정된 상황을 유지하며 도전을 포기한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "아이가 자신의 가치를 형성할 수 있도록 존중한다.",
      "부모로서 내가 옳다고 생각하는 가치를 아이에게 주입한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "관계를 회복하기 위해 노력하고 대화를 시도한다.",
      "자연스럽게 멀어지는 것을 받아들이고 거리 두기를 선택한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "승진을 위해 추가적인 시간을 투입해 열심히 일한다.",
      "가족과 개인적인 삶을 위해 승진보다는 균형을 중시한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "시간을 쪼개서라도 새로운 배움에 도전한다.",
      "지금은 바쁜 시기이므로 나중에 배우기로 한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "당장 일을 중단하고 건강 회복에 집중한다.",
      "직장을 유지하면서 건강 문제를 천천히 해결한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "직접 개입하여 문제를 해결하려고 한다.",
      "아이 스스로 해결할 수 있도록 기다린다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "전문적인 상담을 받으며 문제를 해결하려 노력한다.",
      "시간이 지나면 감정이 가라앉기를 기다린다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "새로운 분야로 과감하게 이직을 시도한다.",
      "현재의 안정된 직장에 남아 만족할 수 있는 방법을 찾는다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "후회를 기반으로 앞으로 더 나은 선택을 하기로 결심한다.",
      "후회는 어쩔 수 없는 일이라 여기고 지나간 일을 잊는다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "부모님과 더 많은 시간을 보내며 적극적으로 돌본다.",
      "부모님께 시간을 할애하지만, 개인적인 삶의 균형도 유지한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "자녀의 개성을 존중하고 그에 맞는 교육을 지원한다.",
      "부모로서 내가 옳다고 생각하는 방식으로 교육을 강하게 밀어붙인다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "새로운 경험과 활동을 통해 관계에 활기를 불어넣는다.",
      "관계가 자연스럽게 변하는 것이라 여기며 받아들인다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "기회를 받아들여 더 큰 책임을 맡고 발전한다.",
      "현재의 역할에 만족하며 추가적인 책임을 피한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "아이들의 독립을 존중하며 그들의 결정을 지지한다.",
      "아이들의 선택을 지도하고 필요한 조언을 강하게 제시한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "내가 속한 사회에 기여하고자 적극적으로 참여한다.",
      "나의 개인적인 일에 집중하며 참여를 미룬다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "새로운 목표를 설정하고 변화를 시도한다.",
      "지금까지의 삶을 수용하고 큰 변화를 시도하지 않는다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "자녀의 결정을 존중하며 스스로 결정하게 한다.",
      "부모로서 강력한 조언을 제공하고 방향을 제시한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "적극적으로 운동과 관리를 하며 건강을 유지하려 노력한다.",
      "신체적 변화는 자연스러운 것이라 받아들이고 천천히 적응한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "퇴직 후에도 새로운 일이나 취미를 찾아 계속 활동을 이어간다.",
      "퇴직 후에는 여유롭게 지내며 그동안 이루지 못한 일을 즐긴다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "배우자와 함께 새로운 여행이나 모험을 도전해본다.",
      "안정적인 가정생활을 유지하며 익숙한 일상을 즐긴다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "큰 변화를 주도적으로 시도하며 새로운 목표를 찾는다.",
      "현재 상황을 받아들이고 작은 변화를 통해 만족을 찾는다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "개인의 삶에 집중하고 새로운 취미나 활동을 시작한다.",
      "자녀의 삶에 여전히 관여하며 그들의 삶을 계속 지원한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "현재 역할에 만족하며 더 이상의 성장을 멈춘다.",
      "나이와 상관없이 계속해서 새로운 도전을 찾아본다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "재정적인 불안정에도 불구하고 은퇴를 감행한다.",
      "경제적 안정을 위해 더 오랫동안 일한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "사회 봉사나 커뮤니티 활동에 적극적으로 참여한다.",
      "조용하고 여유로운 삶을 추구하며 혼자만의 시간을 보낸다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "자녀나 손주와의 관계를 중요시하며 더 자주 만나려고 한다.",
      "독립적인 생활을 유지하며 개인의 삶에 더 집중한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "함께 여행을 다니거나 새로운 경험을 시도한다.",
      "집에서 조용한 생활을 즐기며 평온한 일상을 유지한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "다시 일할 기회를 받아들여 활동을 이어간다.",
      "은퇴를 지키고 여유로운 삶을 계속한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "재정 계획을 다시 세워 노후를 준비한다.",
      "경제적 불안을 인정하고 현재 상황을 받아들인다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "후배나 자녀에게 내가 겪은 인생 교훈을 적극적으로 전한다.",
      "그들이 스스로 경험을 통해 배울 수 있도록 지켜본다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "친구들과의 관계를 유지하고 새로운 사회적 관계를 형성한다.",
      "혼자만의 시간을 즐기며 외로움을 자연스럽게 받아들인다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "적극적으로 치료하고 건강을 유지하려 노력한다.",
      "나이 듦의 자연스러운 과정으로 받아들인다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "가족의 도움을 기꺼이 받아들이고 감사히 여긴다.",
      "가능한 한 독립적으로 생활하며 도움을 최소화하려 한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "모든 사회적 활동에서 은퇴하고 개인적인 삶에 집중한다.",
      "일부 사회적 활동을 계속하며 사회와의 연결을 유지한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "자녀의 도움을 기꺼이 받는다.",
      "자녀의 삶을 존중하며 혼자서 할 수 있는 만큼 해본다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "새로운 배움을 추구하며 계속해서 성장하려 한다.",
      "현재의 지식을 충분하다고 여기고 여유로운 삶을 산다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "과거를 반성하고 현재의 삶에서 교훈을 얻는다.",
      "과거는 이미 지나간 것이라 여기고 그대로 두기로 한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "느려진 삶을 받아들이고 현재의 순간을 더 즐긴다.",
      "가능한 한 활기차게 지내며 속도를 유지하려 노력한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "죽음을 자연스러운 과정으로 받아들이고 준비한다.",
      "죽음에 대한 두려움을 줄이기 위해 다른 일에 집중한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "자녀와 손주의 삶에 적당히 관여하며 조언을 제공한다.",
      "그들의 삶에 거의 관여하지 않고 그들이 스스로 결정하도록 둔다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "과거의 성취와 기억을 되새기며 인생을 회고한다.",
      "여전히 앞으로의 삶에 새로운 목표를 세우고 추구한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "그들의 죽음을 받아들이고 자신의 삶에 집중한다.",
      "떠난 이들을 그리워하며 추억을 되새긴다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "치료에 최선을 다하고 가능한 한 건강을 유지하려 한다.",
      "자연스럽게 생을 받아들이고 더 이상 무리하지 않는다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "내가 가진 지혜와 교훈을 전하며 그들에게 마지막 인사를 건넨다.",
      "말하지 못한 것들을 남기지 않기 위해 솔직하게 마음을 전한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "현재의 순간을 소중히 여기며 작은 일들에 집중한다.",
      "여전히 의미 있는 일을 찾으며 시간을 보낸다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "남은 가족들과의 시간을 소중히 여기며 지낸다.",
      "자신의 내면을 돌아보며 고요한 시간을 보낸다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "가능한 모든 치료를 시도하며 삶을 연장하려 한다.",
      "더 이상의 치료는 받지 않고 자연스러운 과정을 받아들인다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "더 많은 시간을 가족과 보내지 못한 것을 후회한다.",
      "이루지 못한 목표나 꿈을 후회한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
  {
    choices: [
      "마지막 순간까지 가족과 함께 시간을 보내며 작별을 준비한다.",
      "조용히 나 자신의 내면을 준비하며 홀로 생을 마무리한다.",
    ],
    statChanges: [
      { health: 0, stress: 0, relationships: 0, money: 0 },
      { health: 0, stress: 0, relationships: 0, money: 0 },
    ],
  },
];
