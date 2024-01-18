# Déclaration du fournisseur AzureRM et spécification de la version
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.0.0"
    }
  }
}

# Configuration du fournisseur AzureRM
provider "azurerm" {
  skip_provider_registration = true
  features {}
}

# Définition d'un groupe de ressources Azure
resource "azurerm_resource_group" "example" {
  name     = "lucashugo-rg"
  location = "francecentral"
}

# Définition d'un réseau virtuel Azure
resource "azurerm_virtual_network" "example_vnet" {
  name                = "lucashugoVnet"
  address_space       = ["10.0.0.0/16"]
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name
}

# Définition d'une adresse IP publique Azure
resource "azurerm_public_ip" "example" {
  name                = "lucashugo-publicip"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  allocation_method   = "Static"
}

# Définition d'un sous-réseau Azure
resource "azurerm_subnet" "example" {
  name                 = "lucas-hugo-subnet"
  resource_group_name  = azurerm_resource_group.example.name
  virtual_network_name = azurerm_virtual_network.example_vnet.name
  address_prefixes     = ["10.0.1.0/24"]
}

# Définition d'une interface réseau Azure
resource "azurerm_network_interface" "example" {
  name                = "lucas-hugo-nic"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  ip_configuration {
    name                          = "internal"
    subnet_id                     = azurerm_subnet.example.id
    private_ip_address_allocation = "Dynamic"
    public_ip_address_id          = azurerm_public_ip.example.id
  }
}

# Définition d'une machine virtuelle Linux Azure
resource "azurerm_linux_virtual_machine" "example" {
  name                = "lucashugo-vm"
  resource_group_name = azurerm_resource_group.example.name
  location            = azurerm_resource_group.example.location
  size                = "Standard_F2"
  admin_username      = "hugolucas"
  admin_password      = "HugoLucas75"
  network_interface_ids = [azurerm_network_interface.example.id]

  os_disk {
    caching              = "ReadWrite"
    storage_account_type = "Standard_LRS"
  }

  source_image_reference {
    publisher = "Canonical"
    offer     = "0001-com-ubuntu-server-jammy"
    sku       = "22_04-lts"
    version   = "latest"
  }

  disable_password_authentication = false
}

# Définition d'un serveur MySQL Azure
resource "azurerm_mysql_server" "example" {
  name                = "lucashugomysqlserver"
  location            = azurerm_resource_group.example.location
  resource_group_name = azurerm_resource_group.example.name

  administrator_login          = "admincloud"
  administrator_login_password = "HugoLucas75"

  sku_name   = "GP_Gen5_2"
  storage_mb = 5120
  version    = "8.0"

  auto_grow_enabled                 = true
  backup_retention_days             = 7
  geo_redundant_backup_enabled      = false
  infrastructure_encryption_enabled = false
  public_network_access_enabled     = false
  ssl_enforcement_enabled           = true
  ssl_minimal_tls_version_enforced  = "TLS1_2"
}

# Définition d'une base de données MySQL Azure
resource "azurerm_mysql_database" "example" {
  name                = "lucashugomysqldb"
  resource_group_name = azurerm_resource_group.example.name
  server_name         = azurerm_mysql_server.example.name
  charset             = "utf8"
  collation           = "utf8_unicode_ci"
}
