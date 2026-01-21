#!/bin/bash
# Ubuntu System Setup Script
# Run with: sudo bash setup_ubuntu.sh

# =============================================
# SECTION 1: CHECK IF RUNNING AS ROOT
# =============================================
echo "=== Checking for root access ==="
if [ "$EUID" -ne 0 ]; then 
    echo "ERROR: Please run with sudo!"
    echo "Use: sudo bash $0"
    exit 1
fi
echo "✓ Running as root - good!"

# =============================================
# SECTION 2: SYSTEM UPDATE
# =============================================
echo ""
echo "=== Updating Ubuntu System ==="
apt update && apt upgrade -y
echo "✓ System updated successfully"

# =============================================
# SECTION 3: CREATE USER ACCOUNT
# =============================================
NEW_USER="developer"
USER_PASSWORD="ChangeMe123!"

echo ""
echo "=== Creating User Account ==="
echo "Creating user: $NEW_USER"

if id "$NEW_USER" &>/dev/null; then
    echo "✓ User $NEW_USER already exists"
else
    useradd -m -s /bin/bash "$NEW_USER"
    echo "$NEW_USER:$USER_PASSWORD" | chpasswd
    chage -d 0 "$NEW_USER"
    echo "✓ Created user: $NEW_USER"
    echo "✓ Password set: $USER_PASSWORD"
    echo "⚠ User must change password on first login"
fi

# =============================================
# SECTION 4: CREATE GROUPS
# =============================================
echo ""
echo "=== Setting Up Groups ==="

if ! getent group developers > /dev/null; then
    groupadd developers
    echo "✓ Created 'developers' group"
fi

usermod -aG developers,sudo "$NEW_USER"
echo "✓ Added $NEW_USER to groups: developers, sudo"

# =============================================
# SECTION 5: CREATE FOLDER STRUCTURE
# =============================================
echo ""
echo "=== Creating Folders ==="

BASE_DIR="/opt/mycompany"

mkdir -p "$BASE_DIR"
mkdir -p "$BASE_DIR/projects"
mkdir -p "$BASE_DIR/logs"
mkdir -p "$BASE_DIR/shared"
mkdir -p "$BASE_DIR/scripts"
mkdir -p "/home/$NEW_USER/private"
mkdir -p "/home/$NEW_USER/public"

echo "✓ Created all folders"

# =============================================
# SECTION 6: SET PERMISSIONS
# =============================================
echo ""
echo "=== Setting Permissions ==="

chown -R root:developers "$BASE_DIR"
chmod -R 775 "$BASE_DIR"
echo "✓ Set $BASE_DIR to 775 (group can edit)"

chmod 1777 "$BASE_DIR/shared"
echo "✓ Set shared folder to 1777 (sticky bit enabled)"

chmod 700 "/home/$NEW_USER/private"
echo "✓ Set private folder to 700 (only user)"

chmod 755 "/home/$NEW_USER/public"
echo "✓ Set public folder to 755 (readable by all)"

chown -R "$NEW_USER:$NEW_USER" "/home/$NEW_USER"
echo "✓ Set $NEW_USER as owner of home folder"

# =============================================
# SECTION 7: CREATE WELCOME FILE
# =============================================
echo ""
echo "=== Creating Welcome Guide ==="

cat > "/home/$NEW_USER/WELCOME.txt" << EOF
=== WELCOME TO YOUR NEW UBUNTU SETUP ===

Hello $NEW_USER!

Your account has been created.

Username: $NEW_USER
Temporary Password: $USER_PASSWORD

IMPORTANT:
1. Change password on first login: use 'passwd'
2. Your folders:
   - Private: /home/$NEW_USER/private
   - Public: /home/$NEW_USER/public
   - Projects: $BASE_DIR/projects
   - Shared: $BASE_DIR/shared

Created on: $(date)
EOF

echo "✓ Created welcome file"

# =============================================
# SECTION 8: INSTALL SOFTWARE
# =============================================
echo ""
echo "=== Installing Software ==="

echo "Installing system tools..."
apt install -y htop vim nano curl wget git tree net-tools

echo "Installing development tools..."
apt install -y python3 python3-pip build-essential

echo "✓ All software installed"

# =============================================
# SECTION 9: CREATE SAMPLE SCRIPT
# =============================================
echo ""
echo "=== Creating Sample Script ==="

cat > "$BASE_DIR/scripts/backup_example.sh" << 'EOF'
#!/bin/bash
echo "This is a sample backup script"
echo "Edit this for your actual backup needs"
EOF

chmod +x "$BASE_DIR/scripts/backup_example.sh"
echo "✓ Created example script"

# =============================================
# SECTION 10: FINAL SUMMARY
# =============================================
echo ""
echo "========================================="
echo "✅ SETUP COMPLETED SUCCESSFULLY!"
echo "========================================="
echo ""
echo "📋 SUMMARY:"
echo "-----------"
echo "👤 USER: $NEW_USER"
echo "🔐 PASSWORD: $USER_PASSWORD"
echo ""
echo "📁 FOLDERS:"
echo "   User Home: /home/$NEW_USER/"
echo "   Projects: $BASE_DIR/projects"
echo "   Shared: $BASE_DIR/shared"
echo ""
echo "🔧 SOFTWARE:"
echo "   Installed: htop, vim, nano, git, python3"
echo ""
echo "========================================="
echo "🔄 NEXT STEPS:"
echo "-------------"
echo "1. Switch to new user:"
echo "   su - $NEW_USER"
echo ""
echo "2. CHANGE PASSWORD:"
echo "   passwd"
echo ""
echo "3. Read welcome guide:"
echo "   cat ~/WELCOME.txt"
echo ""
echo "========================================="

exit 0

