using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace sav_vetklinik
{
    public partial class UserForm : Form
    {
        public UserForm()
        {
            InitializeComponent();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void UserForm_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            {
                DataRow nRow = кассаDataSet.Касса.NewRow();
                nRow[1] = comboBox1.Text;
                nRow[2] = textBox1.Text;
                nRow[3] = comboBox2.Text;
                кассаDataSet.Касса.Rows.Add(nRow);
                кассаBindingSource.ResetBindings(false);
                Validate();
                кассаBindingSource.EndEdit();
                кассаTableAdapter.Update(кассаDataSet.Касса);
                MessageBox.Show($"Заказ Принят!");
            }
        }

        private void button4_Click(object sender, EventArgs e)
        {

        }
    }
}
