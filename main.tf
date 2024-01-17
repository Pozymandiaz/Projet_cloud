provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "Projet-Cloud" {
  name     = "Projet-Cloud"
  location = "France Central"
}

resource "azurerm_service_plan" "plan-Cloud" {
  name                = "plan-Cloud"
  location            = azurerm_resource_group.Projet-Cloud.location
  resource_group_name = azurerm_resource_group.Projet-Cloud.name

    sku_name = "B1"
    os_type = "Windows"
  }


resource "azurerm_windows_web_app" "web-cloud" {
  name                = "web-cloud"
  location            = azurerm_resource_group.Projet-Cloud.location
  resource_group_name = azurerm_resource_group.Projet-Cloud.name
  service_plan_id     = azurerm_service_plan.plan-Cloud.id

  site_config {
    always_on = true
  }

  app_settings = {
  "WEBSITE_NODE_DEFAULT_VERSION" = "14",
  "WEBSITE_RUN_FROM_PACKAGE"      = "1",
  "WEBSITE_USE_ZIP"               = "0",
  "WEBSITE_NODE_DEFAULT_VERSION"  = "14.17.6"
}

}
