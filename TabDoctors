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
    public partial class TabDoctors : Form
    {
        public TabDoctors()
        {
            InitializeComponent();
        }

        private void TabDoctors_Load(object sender, EventArgs e)
        {
            // TODO: данная строка кода позволяет загрузить данные в таблицу "doctorsDataSet.Сотрудники". При необходимости она может быть перемещена или удалена.
            this.сотрудникиTableAdapter.Fill(this.doctorsDataSet.Сотрудники);

        }

        private void работаСТаблицамиToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        private void добавитьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            AddDoctors sf = new AddDoctors();
            sf.Owner = this;
            sf.Show();
        }

        private void выходToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void найтиToolStripMenuItem_Click(object sender, EventArgs e)
        {
            SeachDoctors sf = new SeachDoctors();
            sf.Owner = this;
            sf.Show();
        }

        private void обновитьToolStripMenuItem_Click(object sender, EventArgs e)
        {
            сотрудникиTableAdapter.Update(doctorsDataSet);
        }
    }
}
