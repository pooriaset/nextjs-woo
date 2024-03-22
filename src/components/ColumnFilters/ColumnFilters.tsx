import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Collapse,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Switch,
  styled,
} from "@mui/material";
import { useState } from "react";

const ListItem = styled(ListItemButton)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "transparent",
  },
  py: 1,
}));

const Title = styled("span")(({ theme }) => ({
  fontSize: theme.typography.body2.fontSize,
  fontWeight: 700,
}));

const ColumnFilters = () => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Card
      sx={{
        position: "sticky",
        top: 130,
      }}
    >
      <CardContent>
        <List>
          <ListItem disableGutters onClick={handleClick} disableRipple>
            <ListItemText primary={<Title>دسته‌بندی</Title>} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div">
              <ListItem disableRipple>
                <ListItemText primary={<Title>دسته‌بندی اول</Title>} />
              </ListItem>
            </List>
          </Collapse>

          <Divider />

          <ListItem disableGutters disableRipple>
            <ListItemText primary={<Title>فقط کالاهای موجود</Title>} />
            <Switch />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default ColumnFilters;
