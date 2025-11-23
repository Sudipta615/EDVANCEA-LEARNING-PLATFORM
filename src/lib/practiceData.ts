// src/lib/practiceData.ts

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number; // index of the correct option
  explanation: string;
}

export interface PracticeSet {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  estimatedTime: string;
  xp: number; // Points for completing
  questions: Question[];
}

export interface PracticeModule {
  moduleId: number;
  title: string;
  sets: PracticeSet[];
}

export interface CoursePractice {
  courseId: string;
  title: string;
  modules: PracticeModule[];
}

export const practiceData: Record<string, CoursePractice> = {
  '1': {
    courseId: '1',
    title: "Excel Mastery Practice Arena",
    modules: [
      {
        moduleId: 1,
        title: "Excel Fundamentals",
        sets: [
          {
            id: 'p1-m1-s1',
            title: "Interface Scavenger Hunt",
            description: "Identify the correct parts of the Excel interface and their functions.",
            difficulty: 'Easy',
            estimatedTime: "5 min",
            xp: 100,
            questions: [
              {
                id: 'q1',
                text: "Where would you look to see the cell address of the currently selected cell?",
                options: ["Formula Bar", "Name Box", "Status Bar", "Title Bar"],
                correctAnswer: 1,
                explanation: "The Name Box, located to the left of the Formula Bar, displays the address (e.g., A1) of the active cell."
              },
              {
                id: 'q2',
                text: "Which part of the interface allows you to view and edit the content of a cell directly?",
                options: ["The Ribbon", "The Formula Bar", "The Status Bar", "The Quick Access Toolbar"],
                correctAnswer: 1,
                explanation: "The Formula Bar shows the underlying data or formula of the selected cell and allows for direct editing."
              },
              {
                id: 'q3',
                text: "You want to quickly save your workbook without going through the File menu. Where should you look?",
                options: ["The Ribbon", "The Context Menu", "The Quick Access Toolbar", "The View Tab"],
                correctAnswer: 2,
                explanation: "The Quick Access Toolbar (QAT) is located at the very top left and contains shortcuts like Save, Undo, and Redo."
              },
              {
                id: 'q4',
                text: "Which ribbon tab contains the buttons for bold, italic, and underline?",
                options: ["Insert", "Page Layout", "Home", "Data"],
                correctAnswer: 2,
                explanation: "The Home tab contains the most frequently used formatting commands like font style, alignment, and number format."
              },
              {
                id: 'q5',
                text: "Where can you find the Zoom slider to change the magnification of your worksheet?",
                options: ["Top Left Corner", "Bottom Right (Status Bar)", "Review Tab", "File Menu"],
                correctAnswer: 1,
                explanation: "The Zoom slider is located in the bottom right corner of the Excel window on the Status Bar."
              }
            ]
          },
          {
            id: 'p1-m1-s2',
            title: "Navigation Ninja",
            description: "Test your speed and knowledge of keyboard shortcuts.",
            difficulty: 'Medium',
            estimatedTime: "10 min",
            xp: 150,
            questions: [
              {
                id: 'q1',
                text: "Which shortcut instantly takes you to cell A1?",
                options: ["Ctrl + Home", "Ctrl + Up Arrow", "Alt + Home", "Shift + Home"],
                correctAnswer: 0,
                explanation: "Ctrl + Home is the universal shortcut in Excel to jump immediately to the beginning of the worksheet (cell A1)."
              },
              {
                id: 'q2',
                text: "You are in the middle of a massive dataset. You want to jump to the very last row of data. What do you press?",
                options: ["Page Down", "Ctrl + Down Arrow", "Alt + End", "Shift + Down Arrow"],
                correctAnswer: 1,
                explanation: "Ctrl + Arrow Key jumps to the edge of the current data region. Ctrl + Down takes you to the bottom."
              },
              {
                id: 'q3',
                text: "How do you move one screen to the right?",
                options: ["Tab", "Alt + Page Down", "Ctrl + Page Down", "Right Arrow"],
                correctAnswer: 1,
                explanation: "Alt + Page Down moves the view one screen to the right. (Page Down moves one screen down)."
              },
              {
                id: 'q4',
                text: "Which key allows you to edit the active cell without clicking inside the formula bar?",
                options: ["F2", "F4", "Enter", "Space"],
                correctAnswer: 0,
                explanation: "F2 toggles 'Edit Mode' for the active cell, placing your cursor at the end of the cell's content."
              },
              {
                id: 'q5',
                text: "You want to switch between open Excel workbooks. Which shortcut helps?",
                options: ["Ctrl + Tab", "Alt + Tab", "Ctrl + F6", "All of the above"],
                correctAnswer: 3,
                explanation: "All these shortcuts can be used to switch windows, though Ctrl+F6 is specific to switching between workbook windows within Excel."
              }
            ]
          }
        ]
      },
      {
        moduleId: 2,
        title: "Essential Functions",
        sets: [
          {
            id: 'p1-m2-s1',
            title: "Formula Debugging",
            description: "Identify errors in common SUM, AVERAGE, and COUNT formulas.",
            difficulty: 'Medium',
            estimatedTime: "15 min",
            xp: 200,
            questions: [
              {
                id: 'q1',
                text: "What does the error #DIV/0! indicate?",
                options: ["The formula contains text", "You are trying to divide by zero", "The column is too narrow", "The reference is invalid"],
                correctAnswer: 1,
                explanation: "Excel cannot divide a number by zero (or an empty cell). This results in the #DIV/0! error."
              },
              {
                id: 'q2',
                text: "You wrote =SUM(A1:A5) but the result is 0, even though there are numbers. What is the most likely cause?",
                options: ["The numbers are formatted as Text", "The formula is in lowercase", "You forgot the equals sign", "The cells are hidden"],
                correctAnswer: 0,
                explanation: "If numbers are stored as text, the SUM function ignores them. You need to convert them to numbers."
              },
              {
                id: 'q3',
                text: "Which of these is a valid absolute reference?",
                options: ["A1", "$A1", "A$1", "$A$1"],
                correctAnswer: 3,
                explanation: "$A$1 locks both the column and the row, making it a fully absolute reference that won't change when copied."
              },
              {
                id: 'q4',
                text: "What happens if you omit the equals sign (=) at the start of a formula?",
                options: ["Excel treats it as text", "Excel gives a #NAME? error", "Excel automatically adds it", "The cell turns red"],
                correctAnswer: 0,
                explanation: "Without the equals sign, Excel treats the input as a plain text string or number, not a calculation."
              },
              {
                id: 'q5',
                text: "Your formula returns '#####'. What should you do?",
                options: ["Delete the formula", "Widen the column", "Change the font color", "Restart Excel"],
                correctAnswer: 1,
                explanation: "The '#####' symbols usually mean the column is not wide enough to display the number or date."
              },
              {
                id: 'q6',
                text: "Which function would you use to count cells that contain ANY type of data (text or numbers)?",
                options: ["COUNT", "COUNTA", "COUNTIF", "SUM"],
                correctAnswer: 1,
                explanation: "COUNT only counts numbers. COUNTA counts any cell that is not empty."
              }
            ]
          }
        ]
      }
    ]
  }
};