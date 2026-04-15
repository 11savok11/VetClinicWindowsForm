using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.OleDb;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace sav_vetklinik
{
    public partial class AddPacients : Form
    {
        public AddPacients()
        {
            InitializeComponent();
        }

        private void выходToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void работаСТаблицамиToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                TabPacients main = this.Owner as TabPacients;
                if (main != null)
                {
                    if (string.IsNullOrWhiteSpace(textBox1.Text) || string.IsNullOrWhiteSpace(textBox2.Text) || string.IsNullOrWhiteSpace(textBox3.Text))
                    {
                        MessageBox.Show("Пожалуйста, заполните все поля.");
                        return;
                    }

                    string dbPath = Path.Combine(Application.StartupPath, "Ветклиника.accdb");
                    string connectionString = $"Provider=Microsoft.ACE.OLEDB.12.0;Data Source={dbPath};Persist Security Info=False;";

                    using (OleDbConnection connection = new OleDbConnection(connectionString))
                    {
                        connection.Open();

                        OleDbCommand command = new OleDbCommand("INSERT INTO [] ([], [], [], []) VALUES (?, ?, ?, ?)", connection);
                        command.Parameters.AddWithValue("@", textBox1.Text);
                        command.Parameters.AddWithValue("@", textBox2.Text);
                        command.Parameters.AddWithValue("@", textBox3.Text);
                        command.Parameters.AddWithValue("@", textBox4.Text);
                        command.ExecuteNonQuery();
                    }

                    DataRow nRow = main.pacientsDataSet.Tables[0].NewRow();
                    nRow[1] = textBox1.Text;
                    nRow[2] = textBox2.Text;
                    nRow[3] = textBox3.Text;
                    nRow[4] = textBox4.Text;

                    main.pacientsDataSet.Tables[0].Rows.Add(nRow);
                    main.pacientsDataSet.Tables[0].AcceptChanges();
                    main.dataGridView1.Refresh();

                    textBox1.Text = "";
                    textBox2.Text = "";
                    textBox3.Text = "";
                    textBox4.Text = "";
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Ошибка при сохранении данных: {ex.Message}");
            }
        }
    }
}

