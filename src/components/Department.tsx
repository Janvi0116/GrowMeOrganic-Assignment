import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

type Department = {
  department: string;
  sub_departments: string[];
};

type ExpandedState = {
  [key: string]: boolean;
};

type SubDepartmentState = {
  [key: string]: boolean;
};

type DepartmentState = {
  checked: boolean;
  subDepartments: SubDepartmentState;
};

type SelectedState = {
  [key: string]: DepartmentState;
};

const DepartmentList: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [selected, setSelected] = useState<SelectedState>({});

  useEffect(() => {
    // Simulating API call
    const fetchData = async (): Promise<void> => {
      const data: Department[] = [
        {
          department: "customer_service",
          sub_departments: [
            "support",
            "customer_success"
          ]
        },
        {
          department: "design",
          sub_departments: [
            "graphic_design",
            "product_design",
            "web_design"
          ]
        }
      ];
      setDepartments(data);
      
      const initialExpanded: ExpandedState = {};
      const initialSelected: SelectedState = {};
      data.forEach(dept => {
        initialExpanded[dept.department] = false;
        initialSelected[dept.department] = {
          checked: false,
          subDepartments: dept.sub_departments.reduce((acc, subDept) => {
            acc[subDept] = false;
            return acc;
          }, {} as SubDepartmentState)
        };
      });
      setExpanded(initialExpanded);
      setSelected(initialSelected);
    };

    fetchData();
  }, []);

  const handleToggle = (department: string): void => {
    setExpanded(prev => ({ ...prev, [department]: !prev[department] }));
  };

  const handleDepartmentSelect = (department: string): void => {
    setSelected(prev => {
      const newSelected = { ...prev };
      const isChecked = !newSelected[department].checked;
      newSelected[department].checked = isChecked;
      Object.keys(newSelected[department].subDepartments).forEach(subDept => {
        newSelected[department].subDepartments[subDept] = isChecked;
      });
      return newSelected;
    });
  };

  const handleSubDepartmentSelect = (department: string, subDepartment: string): void => {
    setSelected(prev => {
      const newSelected = { ...prev };
      newSelected[department].subDepartments[subDepartment] = !newSelected[department].subDepartments[subDepartment];
      
      const allSubDepartmentsSelected = Object.values(newSelected[department].subDepartments).every(value => value);
      newSelected[department].checked = allSubDepartmentsSelected;
      
      return newSelected;
    });
  };

  return (
    <List>
      {departments.map((dept) => (
        <React.Fragment key={dept.department}>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected[dept.department]?.checked || false}
                onChange={() => handleDepartmentSelect(dept.department)}
              />
            </ListItemIcon>
            <ListItemText primary={dept.department} />
            <IconButton onClick={() => handleToggle(dept.department)}>
              {expanded[dept.department] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </IconButton>
          </ListItem>
          <Collapse in={expanded[dept.department]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {dept.sub_departments.map((subDept) => (
                <ListItem key={subDept} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selected[dept.department]?.subDepartments[subDept] || false}
                      onChange={() => handleSubDepartmentSelect(dept.department, subDept)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={subDept} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;