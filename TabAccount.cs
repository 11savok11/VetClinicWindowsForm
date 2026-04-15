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
    public partial class TabAccount : Form
    {
        public TabAccount()
        {
            InitializeComponent();
        }

        private void TabAccount_Load(object sender, EventArgs e)
        {
            // TODO: данная строка кода позволяет загрузить данные в таблицу "accountDataSet.Аккаунты". При необходимости она может быть перемещена или удалена.
            this.аккаунтыTableAdapter.Fill(this.accountDataSet.Аккаунты);

        }

        private void FileMenuItem_Click(object sender, EventArgs e)
        {

        }

        private void добавитьToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }
    }
}
