export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // index of the correct option
  explanation: string;
}

export interface PracticeTopic {
  id: string;
  title: string;
  category: "Excel" | "Finance" | "PowerPoint" | "Video Editing";
  icon: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  questions: Question[];
}

export const practiceTopics: PracticeTopic[] = [
  {
    id: "excel-basics",
    title: "Excel Formulas 101",
    category: "Excel",
    icon: "Fn",
    description: "Test your knowledge on basic arithmetic and logic formulas.",
    difficulty: "Beginner",
    questions: [
      {
        id: "q1",
        text: "Which symbol must all Excel formulas begin with?",
        options: ["$", "#", "=", "&"],
        correctAnswer: 2,
        explanation: "All Excel formulas must start with the equals sign (=)."
      },
      {
        id: "q2",
        text: "Which function adds all numbers in a range of cells?",
        options: ["ADD", "SUM", "TOTAL", "COUNT"],
        correctAnswer: 1,
        explanation: "The SUM function adds values. You can add individual values, cell references or ranges or a mix of all three."
      },
      {
        id: "q3",
        text: "What is the correct formula to find the average of cells A1 through A5?",
        options: ["=AVG(A1:A5)", "=AVERAGE(A1:A5)", "=MEAN(A1:A5)", "=MEDIAN(A1:A5)"],
        correctAnswer: 1,
        explanation: "AVERAGE is the correct function name in Excel to calculate the arithmetic mean."
      }
    ]
  },
  {
    id: "excel-lookup",
    title: "Lookup Functions",
    category: "Excel",
    icon: "Eg",
    description: "Master VLOOKUP, HLOOKUP, and XLOOKUP.",
    difficulty: "Intermediate",
    questions: [
      {
        id: "q4",
        text: "In VLOOKUP, what does the 'column_index_num' argument represent?",
        options: ["The row number to return", "The column number in the table array to return value from", "The total number of columns", "The lookup value's column"],
        correctAnswer: 1,
        explanation: "It specifies the column number in the table_array from which the matching value should be returned."
      },
      {
        id: "q5",
        text: "Which argument in XLOOKUP is optional?",
        options: ["lookup_value", "lookup_array", "return_array", "if_not_found"],
        correctAnswer: 3,
        explanation: "The 'if_not_found', 'match_mode', and 'search_mode' arguments are optional in XLOOKUP."
      }
    ]
  },
  {
    id: "finance-ratios",
    title: "Financial Ratios",
    category: "Finance",
    icon: "%",
    description: "Analyze company health using key financial ratios.",
    difficulty: "Intermediate",
    questions: [
      {
        id: "q6",
        text: "Which ratio measures a company's ability to pay short-term obligations?",
        options: ["Debt-to-Equity Ratio", "Current Ratio", "Return on Equity", "Gross Margin"],
        correctAnswer: 1,
        explanation: "The Current Ratio is a liquidity ratio that measures a company's ability to pay short-term obligations or those due within one year."
      },
      {
        id: "q7",
        text: "How is Earnings Per Share (EPS) calculated?",
        options: ["Net Income / Total Assets", "Revenue / Outstanding Shares", "Net Income / Outstanding Shares", "Dividends / Net Income"],
        correctAnswer: 2,
        explanation: "EPS is calculated as a company's profit divided by the outstanding shares of its common stock."
      }
    ]
  },
  {
    id: "ppt-design",
    title: "Presentation Design",
    category: "PowerPoint",
    icon: "Aa",
    description: "Best practices for slide layouts and visual hierarchy.",
    difficulty: "Beginner",
    questions: [
      {
        id: "q8",
        text: "What is the '10/20/30 Rule' of PowerPoint?",
        options: ["10 slides, 20 minutes, 30 point font", "10 minutes, 20 slides, 30 people", "10 colors, 20 words, 30 minutes", "None of the above"],
        correctAnswer: 0,
        explanation: "Guy Kawasaki's rule: a presentation should have 10 slides, last no more than 20 minutes, and contain no font smaller than 30 points."
      }
    ]
  },
  {
    id: "video-editing-cuts",
    title: "Editing Cuts & Transitions",
    category: "Video Editing",
    icon: "Eb",
    description: "Learn when to use J-cuts, L-cuts, and jump cuts.",
    difficulty: "Advanced",
    questions: [
      {
        id: "q9",
        text: "What is an 'L-Cut'?",
        options: ["Video cuts before audio", "Audio cuts before video", "Audio from the previous shot continues into the next shot", "Video from the next shot starts before its audio"],
        correctAnswer: 2,
        explanation: "In an L-cut, the audio from the preceding scene continues to play over the footage of the following scene."
      }
    ]
  }
];