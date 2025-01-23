INSERT INTO tickets (customer_ID, title, description, completed, tech) 
VALUES
    (1, 'Password Reset', 'Customer requested a reset for their account password.', false, 'Tech1'),
    (1, 'Software Installation', 'Requested help installing accounting software.', false, 'Tech2'),
    (1, 'Network Issue', 'Reported slow internet connection.', true, 'Tech3'),
    (4, 'Printer Not Working', 'Printer is offline and not responding to commands.', false, 'Tech4'),
    (3, 'Email Setup', 'Help needed to configure work email on mobile.', false, 'unassigned'),
    (3, 'Hardware Upgrade', 'Requested RAM and SSD upgrade for laptop.', true, 'Tech5'),
    (3, 'Account Locked', 'Customer locked out of account after multiple failed logins.', false, 'Tech2'),
    (4, 'Bug Report', 'Reported a bug in the new inventory management system.', false, 'unassigned'),
    (4, 'Data Backup', 'Customer wants to back up all company files to the cloud.', true, 'Tech1'),
    (10, 'Software Crash', 'Frequent crashes reported in word processing software.', false, 'Tech3');

