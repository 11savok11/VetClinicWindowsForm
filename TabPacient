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
    public partial class TabPacients : Form
    {
        public TabPacients()
        {
            InitializeComponent();
        }

        private void TabPacients_Load(object sender, EventArgs e)
        {
            // TODO: данная строка кода позволяет загрузить данные в таблицу "pacientsDataSet.Пациенты". При необходимости она может быть перемещена или удалена.
            this.пациентыTableAdapter.Fill(this.pacientsDataSet.Пациенты);

        }

        private void добавитьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            AddPacients sf = new AddPacients();
            sf.Owner = this;
            sf.Show();
        }

        private void выходToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Close();    
        }

        private void найтиToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SeachPacients sf = new SeachPacients();
            sf.Owner = this;
            sf.Show();
        }

        private void обновитьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            пациентыTableAdapter.Update(pacientsDataSet);
        }

        private void MdiMenu_ItemClicked(object sender, ToolStripItemClickedEventArgs e)
        {

        }
    }
}
