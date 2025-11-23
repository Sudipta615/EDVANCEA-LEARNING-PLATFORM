// src/lib/lessonData.tsx
import { Badge } from "@/components/ui/badge"
import { ReactNode } from "react"

export interface LessonContent {
  id: string
  title: string
  content: ReactNode
}

export const lessonData: Record<string, LessonContent> = {
  '1': {
    id: '1',
    title: "Getting Started with Excel",
    content: (
      <div className="space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          Microsoft Excel is a powerful spreadsheet application used for storing, organizing, and analyzing data. Whether you're budgeting for your household or analyzing complex financial data for a corporation, Excel is the tool of choice.
        </p>
        <h3 className="text-xl font-bold text-foreground mt-6">What is a Spreadsheet?</h3>
        <p>
          A spreadsheet is a digital ledger consisting of rows and columns. The intersection of a row and a column is called a <strong>Cell</strong>. Cells can contain:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Text:</strong> Labels, names, headings.</li>
          <li><strong>Numbers:</strong> Counts, currency, percentages.</li>
          <li><strong>Formulas:</strong> Mathematical equations that calculate values based on other cells.</li>
        </ul>
        
        <div className="bg-secondary/20 p-4 rounded-lg border-l-4 border-primary my-4">
          <strong>Key Terminology:</strong>
          <ul className="mt-2 space-y-1 text-sm">
            <li><span className="font-semibold">Workbook:</span> The entire Excel file (.xlsx).</li>
            <li><span className="font-semibold">Worksheet:</span> A single page or tab within the workbook.</li>
            <li><span className="font-semibold">Cell Address:</span> The column letter followed by the row number (e.g., A1, B10).</li>
          </ul>
        </div>
      </div>
    )
  },
  '2': {
    id: '2',
    title: "Understanding the Ribbon",
    content: (
      <div className="space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          The <strong>Ribbon</strong> is the command bar located at the top of the Excel window. It organizes features into a series of tabs to help you find commands quickly.
        </p>
        
        <h3 className="text-xl font-bold text-foreground mt-6">Main Tabs Explained</h3>
        <div className="grid gap-4 mt-4">
          <div className="p-4 border rounded-lg bg-card">
            <span className="font-bold text-primary block mb-1">Home</span>
            Contains the most frequently used commands like formatting (Bold, Italic), alignment, and basic math functions (AutoSum).
          </div>
          <div className="p-4 border rounded-lg bg-card">
            <span className="font-bold text-primary block mb-1">Insert</span>
            Used for adding elements like Tables, Charts, Pictures, and Shapes.
          </div>
          <div className="p-4 border rounded-lg bg-card">
            <span className="font-bold text-primary block mb-1">Data</span>
            Essential for importing, sorting, filtering, and validating data.
          </div>
          <div className="p-4 border rounded-lg bg-card">
            <span className="font-bold text-primary block mb-1">Formulas</span>
            The library of Excel's functions, named ranges, and formula auditing tools.
          </div>
        </div>

        <p className="mt-4">
          You can collapse the ribbon by double-clicking any tab name to give yourself more screen space for data. Double-click again to bring it back.
        </p>
      </div>
    )
  },
  '3': {
    id: '3',
    title: "Basic Navigation",
    content: (
      <div className="space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          Efficient navigation separates beginners from pros. Stop clicking everywhere and start using your keyboard!
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Essential Keyboard Shortcuts</h3>
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm text-left">
            <thead className="bg-secondary text-foreground">
              <tr>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Shortcut (Windows)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="bg-card">
                <td className="px-4 py-3">Move one cell right</td>
                <td className="px-4 py-3 font-mono text-primary">Tab</td>
              </tr>
              <tr className="bg-card/50">
                <td className="px-4 py-3">Move one cell down</td>
                <td className="px-4 py-3 font-mono text-primary">Enter</td>
              </tr>
              <tr className="bg-card">
                <td className="px-4 py-3">Go to cell A1</td>
                <td className="px-4 py-3 font-mono text-primary">Ctrl + Home</td>
              </tr>
              <tr className="bg-card/50">
                <td className="px-4 py-3">Go to last active cell</td>
                <td className="px-4 py-3 font-mono text-primary">Ctrl + End</td>
              </tr>
              <tr className="bg-card">
                <td className="px-4 py-3">Move one screen down</td>
                <td className="px-4 py-3 font-mono text-primary">Page Down</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4">
          <strong>Pro Tip:</strong> To edit the content of a cell without overwriting it, press <span className="font-mono bg-secondary px-1 rounded text-sm">F2</span>.
        </p>
      </div>
    )
  },
  '4': {
    id: '4',
    title: "Saving and Managing Files",
    content: (
      <div className="space-y-6 text-lg leading-relaxed text-slate-700 dark:text-slate-300">
        <p>
          Knowing how to save correctly ensures you don't lose work and that your file is compatible with others.
        </p>

        <h3 className="text-xl font-bold text-foreground mt-6">Save vs. Save As</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Save (Ctrl + S):</strong> Updates the current file with your latest changes.</li>
          <li><strong>Save As (F12):</strong> Creates a <em>copy</em> of your file with a new name, location, or file type.</li>
        </ul>

        <h3 className="text-xl font-bold text-foreground mt-6">Common File Formats</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Badge>xlsx</Badge>
            <span>The standard modern Excel workbook format.</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="secondary">csv</Badge>
            <span>Comma Separated Values. Plain text data separated by commas. No formatting or formulas are saved.</span>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline">xlsm</Badge>
            <span>Excel Macro-Enabled Workbook. Use this if your file contains VBA macros.</span>
          </div>
        </div>
      </div>
    )
  }
}