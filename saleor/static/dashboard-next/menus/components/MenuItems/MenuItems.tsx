import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import * as React from "react";

import { MenuItem } from "../..";
import { ListProps } from "../../..";
import CardTitle from "../../../components/CardTitle";
import Skeleton from "../../../components/Skeleton";
import TablePagination from "../../../components/TablePagination";
import i18n from "../../../i18n";
import { renderCollection } from "../../../misc";

interface MenuItemsProps extends ListProps {
  menuItems?: Array<
    MenuItem & {
      items: {
        totalCount: number;
      };
    }
  >;
  onMenuItemAdd: () => void;
}

const decorate = withStyles({
  row: {
    cursor: "pointer" as "pointer"
  }
});
const MenuItems = decorate<MenuItemsProps>(
  ({
    classes,
    menuItems,
    pageInfo,
    onMenuItemAdd,
    onNextPage,
    onPreviousPage,
    onRowClick
  }) => (
    <Card>
      <CardTitle
        title={i18n.t("Menu Items")}
        toolbar={
          <Button color="secondary" variant="flat" onClick={onMenuItemAdd}>
            {i18n.t("Add submenu")}
          </Button>
        }
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{i18n.t("Name")}</TableCell>
            <TableCell>{i18n.t("Url")}</TableCell>
            <TableCell>{i18n.t("Items")}</TableCell>
          </TableRow>
        </TableHead>
        <TableFooter>
          <TablePagination
            colSpan={2}
            hasNextPage={pageInfo ? pageInfo.hasNextPage : undefined}
            onNextPage={onNextPage}
            hasPreviousPage={pageInfo ? pageInfo.hasPreviousPage : undefined}
            onPreviousPage={onPreviousPage}
          />
        </TableFooter>
        <TableBody>
          {renderCollection(
            menuItems,
            menuItem => (
              <TableRow
                className={classes.row}
                hover={true}
                onClick={
                  menuItem && menuItem.id ? onRowClick(menuItem.id) : undefined
                }
                key={menuItem ? menuItem.id : "skeleton"}
              >
                <TableCell>
                  {menuItem && menuItem.name !== undefined ? (
                    menuItem.name
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell>
                  {menuItem && menuItem.url !== undefined ? (
                    menuItem.url
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
                <TableCell>
                  {menuItem &&
                  menuItem.items &&
                  menuItem.items.totalCount !== undefined ? (
                    menuItem.items.totalCount
                  ) : (
                    <Skeleton />
                  )}
                </TableCell>
              </TableRow>
            ),
            () => (
              <TableRow>
                <TableCell colSpan={3}>
                  {i18n.t("No menu items found")}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Card>
  )
);
MenuItems.displayName = "MenuItems";
export default MenuItems;
