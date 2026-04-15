using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.OleDb;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace sav_vetklinik
{
    public partial class LoginForm : Form
    {
        public LoginForm()
        {
            InitializeComponent();
        }
        private const string ConnectionString = "Provider=Microsoft.ACE.OLEDB.12.0;Data Source=Ветклиника.accdb;";
        private void button1_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void linkLabel1_LinkClicked(object sender, LinkLabelLinkClickedEventArgs e)
        {
            RegisterForm sf = new RegisterForm();
            sf.Owner = this;
            sf.Show();
        }

        private void button6_Click(object sender, EventArgs e)
        {
            {
                string loginuser = tbUserName.Text;
                string password = tbPassword.Text;

                if (string.IsNullOrWhiteSpace(loginuser) || string.IsNullOrWhiteSpace(password))
                {
                    MessageBox.Show("Пожалуйста, введите логин и пароль.", "Ошибка",
                        MessageBoxButtons.OK, MessageBoxIcon.Warning);
                    return;
                }

                DataTable table = new DataTable();

                using (OleDbConnection connection = new OleDbConnection(ConnectionString))
                {
                    string query = "SELECT * FROM [Аккаунты] WHERE [Login] = @ul AND [Password] = @up";
                    using (OleDbCommand command = new OleDbCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@ul", loginuser);
                        command.Parameters.AddWithValue("@up", password);

                        OleDbDataAdapter adapter = new OleDbDataAdapter(command);
                        adapter.Fill(table);
                    }
                }

                if (table.Rows.Count > 0)
                {
                    string userRole = table.Rows[0]["Role"].ToString().Trim();
                    switch (userRole.ToLower())
                    {
                        case "админ":
                            AdminForm adminForm = new AdminForm();
                            adminForm.Owner = this;
                            adminForm.Show();
                            this.Hide();
                            MessageBox.Show("Добро пожаловать, Администратор!", "Успешный вход",
                                MessageBoxButtons.OK, MessageBoxIcon.Information);
                            break;

                        case "блок":
                            MessageBox.Show("Ваш аккаунт заблокирован.",
                                "Доступ запрещен", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            tbUserName.Clear();
                            tbPassword.Clear();
                            tbUserName.Focus();
                            break;

                        default:
                            UserForm mainForm = new UserForm();
                            mainForm.Owner = this;
                            mainForm.Show();
                            this.Hide();
                            MessageBox.Show("Добро пожаловать!", "Успешный вход",
                                MessageBoxButtons.OK, MessageBoxIcon.Information);
                            break;
                    }
                }
                else
                {
                    MessageBox.Show("Неверный логин или пароль. Пожалуйста, проверьте введенные данные.",
                        "Ошибка авторизации", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    tbPassword.Clear();
                    tbPassword.Focus();
                }
            }
        }
    }
}
