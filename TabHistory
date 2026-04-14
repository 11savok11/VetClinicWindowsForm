using sav_vetklinik.DoctorsDataSetTableAdapters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace sav_vetklinik
{
    public partial class TabHistory : Form
    {
        public TabHistory()
        {
            InitializeComponent();
        }

        private void TabHistory_Load(object sender, EventArgs e)
        {
            // TODO: данная строка кода позволяет загрузить данные в таблицу "historyDataSet.История_Записей". При необходимости она может быть перемещена или удалена.
            this.история_ЗаписейTableAdapter.Fill(this.historyDataSet.История_Записей);

        }

        private void добавитьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            AddHistory sf = new AddHistory();
            sf.Owner = this;
            sf.Show();
        }

        private void выходToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void работаСТаблицамиToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        private void найтиToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SeachHistory sf = new SeachHistory();
            sf.Owner = this;
            sf.Show();
        }

        private void обновитьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            история_ЗаписейTableAdapter.Update(historyDataSet);
        }

        private void MdiMenu_ItemClicked(object sender, ToolStripItemClickedEventArgs e)
        {

        }
    }
}
